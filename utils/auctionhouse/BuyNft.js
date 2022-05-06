import { AuctionHouseProgram } from "@metaplex-foundation/mpl-auction-house";
import { MetadataProgram } from "@metaplex-foundation/mpl-token-metadata";

import {
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

export default async function buyNftTransaction(nft, wallet) {
  if (!wallet.publicKey || !wallet.signTransaction) {
    return;
  }

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

  const seller = new PublicKey(nft.listings[0].seller);

  const tokenMint = new PublicKey(nft.mintAddress);

  const auctionHouseTreasury = new PublicKey(
    process.env.NEXT_PUBLIC_AUCTIONHOUSE_TREASURY
  );

  const listingReceipt = new PublicKey(nft.listings[0].address);
  const sellerPaymentReceiptAccount = new PublicKey(nft.listings[0].seller);
  const sellerTradeState = new PublicKey(nft.listings[0].tradeState);
  const buyerPrice = nft.listings[0].price;
  const tokenAccount = new PublicKey(nft.owner.associatedTokenAccountAddress);
  const [metadata] = await MetadataProgram.findMetadataAccount(tokenMint);

  const [escrowPaymentAccount, escrowPaymentBump] =
    await AuctionHouseProgram.findEscrowPaymentAccountAddress(
      auctionHouse,
      wallet.publicKey
    );

  const [buyerTradeState, tradeStateBump] =
    await AuctionHouseProgram.findPublicBidTradeStateAddress(
      wallet.publicKey,
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
      wallet.publicKey
    );

  const [bidReceipt, bidReceiptBump] =
    await AuctionHouseProgram.findBidReceiptAddress(buyerTradeState);

  const [purchaseReceipt, purchaseReceiptBump] =
    await AuctionHouseProgram.findPurchaseReceiptAddress(
      sellerTradeState,
      buyerTradeState
    );

  const publicBuyInstructionAccounts = {
    wallet: wallet.publicKey,
    paymentAccount: wallet.publicKey,
    transferAuthority: wallet.publicKey,
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
    buyer: wallet.publicKey,
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
    bookkeeper: wallet.publicKey,
    receipt: bidReceipt,
    instruction: SYSVAR_INSTRUCTIONS_PUBKEY,
  };

  const printBidReceiptArgs = {
    receiptBump: bidReceiptBump,
  };

  const printPurchaseReceiptAccounts = {
    bookkeeper: wallet.publicKey,
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
  txt.feePayer = wallet.publicKey;

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
