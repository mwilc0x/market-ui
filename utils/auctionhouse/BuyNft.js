import { toast } from "react-toastify";
import { AuctionHouseProgram } from "@metaplex-foundation/mpl-auction-house";
import { MetadataProgram } from "@metaplex-foundation/mpl-token-metadata";

import {
  Connection,
  PublicKey,
  SYSVAR_INSTRUCTIONS_PUBKEY,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

import { concat } from "ramda";

const {
  createPublicBuyInstruction,
  createExecuteSaleInstruction,
  createPrintBidReceiptInstruction,
  createPrintPurchaseReceiptInstruction,
} = AuctionHouseProgram.instructions;

export default async function buyNftTransaction(
  nft,
  listing,
  publicKey,
  signTransaction,
  ah,
  refetch
) {
  const connection = new Connection(process.env.NEXT_PUBLIC_RPC, "confirmed");

  const auctionHouse = new PublicKey(ah.auctionhouse);
  const authority = new PublicKey(ah.authority);
  const auctionHouseFeeAccount = new PublicKey(ah.feeAccount);
  const treasuryMint = new PublicKey(ah.treasuryMint);

  const seller = new PublicKey(listing.seller);
  const tokenMint = new PublicKey(nft.mintAddress);

  const auctionHouseTreasury = new PublicKey(ah.treasury);

  const listingReceipt = new PublicKey(listing.address);
  const sellerPaymentReceiptAccount = new PublicKey(listing.seller);
  const sellerTradeState = new PublicKey(listing.tradeState);
  const buyerPrice = listing.price;
  const tokenAccount = new PublicKey(nft.owner.associatedTokenAccountAddress);
  const [metadata] = await MetadataProgram.findMetadataAccount(tokenMint);

  const [escrowPaymentAccount, escrowPaymentBump] =
    await AuctionHouseProgram.findEscrowPaymentAccountAddress(
      auctionHouse,
      publicKey
    );

  const [buyerTradeState, tradeStateBump] =
    await AuctionHouseProgram.findPublicBidTradeStateAddress(
      publicKey,
      auctionHouse,
      treasuryMint,
      tokenMint,
      buyerPrice,
      1
    );

  const [freeTradeState, freeTradeStateBump] =
    await AuctionHouseProgram.findTradeStateAddress(
      seller,
      auctionHouse,
      tokenAccount,
      treasuryMint,
      tokenMint,
      0,
      1
    );

  const [programAsSigner, programAsSignerBump] =
    await AuctionHouseProgram.findAuctionHouseProgramAsSignerAddress();

  const [buyerReceiptTokenAccount] =
    await AuctionHouseProgram.findAssociatedTokenAccountAddress(
      tokenMint,
      publicKey
    );

  const [bidReceipt, bidReceiptBump] =
    await AuctionHouseProgram.findBidReceiptAddress(buyerTradeState);

  const [purchaseReceipt, purchaseReceiptBump] =
    await AuctionHouseProgram.findPurchaseReceiptAddress(
      sellerTradeState,
      buyerTradeState
    );

  const publicBuyInstructionAccounts = {
    wallet: publicKey,
    paymentAccount: publicKey,
    transferAuthority: publicKey,
    treasuryMint,
    tokenAccount,
    metadata,
    escrowPaymentAccount,
    authority,
    auctionHouse,
    auctionHouseFeeAccount,
    buyerTradeState,
  };

  const publicBuyInstructionArgs = {
    tradeStateBump,
    escrowPaymentBump,
    buyerPrice,
    tokenSize: 1,
  };

  const executeSaleInstructionAccounts = {
    buyer: publicKey,
    seller,
    tokenAccount,
    tokenMint,
    metadata,
    treasuryMint,
    escrowPaymentAccount,
    sellerPaymentReceiptAccount,
    buyerReceiptTokenAccount,
    authority,
    auctionHouse,
    auctionHouseFeeAccount,
    auctionHouseTreasury,
    buyerTradeState,
    sellerTradeState,
    freeTradeState,
    programAsSigner,
  };

  const executeSaleInstructionArgs = {
    escrowPaymentBump,
    freeTradeStateBump,
    programAsSignerBump,
    buyerPrice,
    tokenSize: 1,
  };

  const printBidReceiptAccounts = {
    bookkeeper: publicKey,
    receipt: bidReceipt,
    instruction: SYSVAR_INSTRUCTIONS_PUBKEY,
  };

  const printBidReceiptArgs = {
    receiptBump: bidReceiptBump,
  };

  const printPurchaseReceiptAccounts = {
    bookkeeper: publicKey,
    purchaseReceipt,
    bidReceipt,
    listingReceipt,
    instruction: SYSVAR_INSTRUCTIONS_PUBKEY,
  };

  const printPurchaseReceiptArgs = {
    purchaseReceiptBump,
  };

  const publicBuyInstruction = createPublicBuyInstruction(
    publicBuyInstructionAccounts,
    publicBuyInstructionArgs
  );

  const printBidReceiptInstruction = createPrintBidReceiptInstruction(
    printBidReceiptAccounts,
    printBidReceiptArgs
  );

  const executeSaleInstruction = createExecuteSaleInstruction(
    executeSaleInstructionAccounts,
    executeSaleInstructionArgs
  );

  const printPurchaseReceiptInstruction = createPrintPurchaseReceiptInstruction(
    printPurchaseReceiptAccounts,
    printPurchaseReceiptArgs
  );

  const txt = new Transaction();

  txt
    .add(publicBuyInstruction)
    .add(printBidReceiptInstruction)
    .add(
      new TransactionInstruction({
        programId: AuctionHouseProgram.PUBKEY,
        data: executeSaleInstruction.data,
        keys: concat(
          executeSaleInstruction.keys,
          nft.creators.map((creator) => ({
            pubkey: new PublicKey(creator.address),
            isSigner: false,
            isWritable: true,
          }))
        ),
      })
    )
    .add(printPurchaseReceiptInstruction);

  txt.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
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

    await refetch();

    toast.success("The transaction was confirmed.");
  } catch (e) {
    toast.error(e.message);
  }
}
