import { 
    PROGRAM_ADDRESS
  } from "@metaplex-foundation/mpl-auction-house";
import { Program } from '@metaplex-foundation/mpl-core';
import { PublicKey } from '@solana/web3.js';

export class AuctionHouseProgram extends Program {
  static PREFIX = 'auction_house';
  static FEE_PAYER = 'fee_payer';
  static TREASURY = 'treasury';
  static SIGNER = 'signer';
  static LISTING_RECEIPT = 'listing_receipt';

  static PUBKEY = new PublicKey(PROGRAM_ADDRESS);

  static TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
  static SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey(
    'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
  );

  static METADATA_BUFFER = Buffer.from("metadata");

  static METADATA_KEY = new PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
  );

  static async findAssociatedTokenAccountAddress(
    mint,
    wallet,
  ) {
    return await PublicKey.findProgramAddress(
      [wallet.toBuffer(), AuctionHouseProgram.TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
      AuctionHouseProgram.SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
    );
  }

  static async findAuctionHouseAddress(
    creator,
    treasuryMint
  ) {
    return PublicKey.findProgramAddress(
      [
        Buffer.from(AuctionHouseProgram.PREFIX, 'utf8'),
        creator.toBuffer(),
        treasuryMint.toBuffer(),
      ],
      AuctionHouseProgram.PUBKEY,
    );
  }

  static async findAuctionHouseProgramAsSignerAddress() {
    return await PublicKey.findProgramAddress(
      [
        Buffer.from(AuctionHouseProgram.PREFIX, 'utf8'),
        Buffer.from(AuctionHouseProgram.SIGNER, 'utf8'),
      ],
      AuctionHouseProgram.PUBKEY,
    );
  }

  static async findAuctionHouseTreasuryAddress(
    auctionHouse,
  ) {
    return await PublicKey.findProgramAddress(
      [
        Buffer.from(AuctionHouseProgram.PREFIX, 'utf8'),
        auctionHouse.toBuffer(),
        Buffer.from(AuctionHouseProgram.TREASURY, 'utf8'),
      ],
      AuctionHouseProgram.PUBKEY,
    );
  };

  static async findEscrowPaymentAccountAddress(
    auctionHouse,
    wallet,
  ) {
    return PublicKey.findProgramAddress(
      [Buffer.from(AuctionHouseProgram.PREFIX, 'utf8'), auctionHouse.toBuffer(), wallet.toBuffer()],
      AuctionHouseProgram.PUBKEY,
    );
  }

  static async findTradeStateAddress(
    wallet,
    auctionHouse,
    tokenAccount,
    treasuryMint,
    tokenMint,
    price,
    tokenSize,
  ) {
    return PublicKey.findProgramAddress(
      [
        Buffer.from(AuctionHouseProgram.PREFIX, 'utf8'),
        wallet.toBuffer(),
        auctionHouse.toBuffer(),
        tokenAccount.toBuffer(),
        treasuryMint.toBuffer(),
        tokenMint.toBuffer(),
        Buffer.from([price], 'utf8'),
        Buffer.from([tokenSize], 'utf8'),
      ],
      AuctionHouseProgram.PUBKEY,
    );
  }

  static async findPublicBidTradeStateAddress(
    wallet,
    auctionHouse,
    treasuryMint,
    tokenMint,
    price,
    tokenSize,
  ) {
    return PublicKey.findProgramAddress(
      [
        Buffer.from(AuctionHouseProgram.PREFIX, 'utf8'),
        wallet.toBuffer(),
        auctionHouse.toBuffer(),
        treasuryMint.toBuffer(),
        tokenMint.toBuffer(),
        Buffer.from([price], 'utf8'),
        Buffer.from([tokenSize], 'utf8'),
      ],
      AuctionHouseProgram.PUBKEY,
    );
  }

  static async findAuctionHouseFeeAddress(auctionHouse) {
    return PublicKey.findProgramAddress(
      [
        Buffer.from(AuctionHouseProgram.PREFIX, 'utf8'),
        auctionHouse.toBuffer(),
        Buffer.from(AuctionHouseProgram.FEE_PAYER, 'utf8'),
      ],
      AuctionHouseProgram.PUBKEY,
    );
  }

  static findMetadataAccount = (mintAddress) =>
    PublicKey.findProgramAddress(
      [
        AuctionHouseProgram.METADATA_BUFFER,
        AuctionHouseProgram.METADATA_KEY.toBuffer(),
        new PublicKey(mintAddress).toBuffer(),
      ],
      AuctionHouseProgram.METADATA_KEY
    );

    static findListingReceiptAddress = (sellerTradeState) => 
      PublicKey.findProgramAddress(
        [Buffer.from(AuctionHouseProgram.LISTING_RECEIPT, 'utf8'), sellerTradeState.toBuffer()],
        AuctionHouseProgram.PUBKEY,
    );
}