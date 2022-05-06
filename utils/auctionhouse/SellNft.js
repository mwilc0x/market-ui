import { toast } from "react-toastify";

import { AuctionHouseProgram } from "@metaplex-foundation/mpl-auction-house";
import { MetadataProgram } from "@metaplex-foundation/mpl-token-metadata";

import {
  Connection,
  Transaction,
  PublicKey,
  LAMPORTS_PER_SOL,
  SYSVAR_INSTRUCTIONS_PUBKEY,
} from "@solana/web3.js";

const { createSellInstruction, createPrintListingReceiptInstruction } =
  AuctionHouseProgram.instructions;

export default async function sellNftTransaction(
  amount,
  nft,
  publicKey,
  signTransaction
) {
  if (!publicKey || !signTransaction || !nft) {
    return;
  }

  const connection = new Connection(process.env.NEXT_PUBLIC_RPC, "confirmed");
  const buyerPrice = Number(amount) * LAMPORTS_PER_SOL;
  const auctionHouse = new PublicKey(process.env.NEXT_PUBLIC_AUCTIONHOUSE);
  const authority = new PublicKey(
    process.env.NEXT_PUBLIC_AUCTIONHOUSE_AUTHORITY
  );
  const auctionHouseFeeAccount = new PublicKey(
    process.env.NEXT_PUBLIC_AUCTIONHOUSE_FEE_ACCOUNT
  );
  const treasuryMint = new PublicKey(
    process.env.NEXT_PUBLIC_AUCTIONHOUSE_TREASURY_MINT
  );
  const tokenMint = new PublicKey(nft.mintAddress);
  const associatedTokenAccount = new PublicKey(
    nft.owner.associatedTokenAccountAddress
  );
  const [sellerTradeState, tradeStateBump] =
    await AuctionHouseProgram.findTradeStateAddress(
      publicKey,
      auctionHouse,
      associatedTokenAccount,
      treasuryMint,
      tokenMint,
      buyerPrice,
      1
    );

  const [metadata] = await MetadataProgram.findMetadataAccount(tokenMint);

  const [programAsSigner, programAsSignerBump] =
    await AuctionHouseProgram.findAuctionHouseProgramAsSignerAddress();

  const [freeTradeState, freeTradeBump] =
    await AuctionHouseProgram.findTradeStateAddress(
      publicKey,
      auctionHouse,
      associatedTokenAccount,
      treasuryMint,
      tokenMint,
      0,
      1
    );

  const txt = new Transaction();

  const sellInstructionArgs = {
    tradeStateBump,
    freeTradeStateBump: freeTradeBump,
    programAsSignerBump: programAsSignerBump,
    buyerPrice,
    tokenSize: 1,
  };

  const sellInstructionAccounts = {
    wallet: publicKey,
    tokenAccount: associatedTokenAccount,
    metadata: metadata,
    authority: authority,
    auctionHouse: auctionHouse,
    auctionHouseFeeAccount: auctionHouseFeeAccount,
    sellerTradeState: sellerTradeState,
    freeSellerTradeState: freeTradeState,
    programAsSigner: programAsSigner,
  };

  const sellInstruction = createSellInstruction(
    sellInstructionAccounts,
    sellInstructionArgs
  );

  const [receipt, receiptBump] =
    await AuctionHouseProgram.findListingReceiptAddress(sellerTradeState);

  const printListingReceiptInstruction = createPrintListingReceiptInstruction(
    {
      receipt,
      bookkeeper: publicKey,
      instruction: SYSVAR_INSTRUCTIONS_PUBKEY,
    },
    {
      receiptBump,
    }
  );

  txt.add(sellInstruction).add(printListingReceiptInstruction);

  txt.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
  txt.feePayer = publicKey;

  let signed;

  try {
    signed = await signTransaction(txt);
  } catch (e) {
    toast.error(e.message);
    return;
  }

  let signature;

  try {
    toast("Sending the transaction to Solana.");

    signature = await connection.sendRawTransaction(signed.serialize());

    await connection.confirmTransaction(signature, "confirmed");

    toast.success("The transaction was confirmed.");
  } catch (e) {
    toast.error(e.message);
  }
}
