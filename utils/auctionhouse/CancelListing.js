import { toast } from "react-toastify";

import { AuctionHouseProgram } from "@metaplex-foundation/mpl-auction-house";

import {
  Connection,
  Transaction,
  PublicKey,
  SYSVAR_INSTRUCTIONS_PUBKEY,
} from "@solana/web3.js";

const { createCancelInstruction, createCancelListingReceiptInstruction } =
  AuctionHouseProgram.instructions;

export default async function cancelListingTransaction(
  nft,
  publicKey,
  signTransaction
) {
  if (!publicKey || !signTransaction) {
    return;
  }

  const listing = nft.listings[0];

  const connection = new Connection(process.env.NEXT_PUBLIC_RPC, "confirmed");

  const auctionHouse = new PublicKey(process.env.NEXT_PUBLIC_AUCTIONHOUSE);
  const authority = new PublicKey(
    process.env.NEXT_PUBLIC_AUCTIONHOUSE_AUTHORITY
  );
  const auctionHouseFeeAccount = new PublicKey(
    process.env.NEXT_PUBLIC_AUCTIONHOUSE_FEE_ACCOUNT
  );
  const tokenMint = new PublicKey(nft.mintAddress);
  const treasuryMint = new PublicKey(
    process.env.NEXT_PUBLIC_AUCTIONHOUSE_TREASURY_MINT
  );
  const receipt = new PublicKey(listing.address);
  const tokenAccount = new PublicKey(nft.owner.associatedTokenAccountAddress);

  const buyerPrice = listing.price;

  const [tradeState] = await AuctionHouseProgram.findTradeStateAddress(
    publicKey,
    auctionHouse,
    tokenAccount,
    treasuryMint,
    tokenMint,
    buyerPrice,
    1
  );

  const cancelInstructionAccounts = {
    wallet: publicKey,
    tokenAccount,
    tokenMint,
    authority,
    auctionHouse,
    auctionHouseFeeAccount,
    tradeState,
  };
  const cancelInstructionArgs = {
    buyerPrice,
    tokenSize: 1,
  };

  const cancelListingReceiptAccounts = {
    receipt,
    instruction: SYSVAR_INSTRUCTIONS_PUBKEY,
  };

  const cancelInstruction = createCancelInstruction(
    cancelInstructionAccounts,
    cancelInstructionArgs
  );
  const cancelListingReceiptInstruction = createCancelListingReceiptInstruction(
    cancelListingReceiptAccounts
  );

  const txt = new Transaction();

  txt.add(cancelInstruction).add(cancelListingReceiptInstruction);

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
