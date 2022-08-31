import React, { createContext, useEffect } from "react";
import {
  useWallet
} from "@solana/wallet-adapter-react";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { guestIdentity, Metaplex, mockStorage, walletAdapterIdentity } from "@metaplex-foundation/js";

const MetaplexContext = createContext();


/*

LIST

 export type CreateListingInput = {
  auctionHouse: AuctionHouse;
  seller?: PublicKey | Signer; // Default: identity
  authority?: PublicKey | Signer; // Default: auctionHouse.authority
  auctioneerAuthority?: Signer; // Use Auctioneer ix when provided
  mintAccount: PublicKey; // Required for checking Metadata
  tokenAccount?: PublicKey; // Default: ATA
  price?: SolAmount | SplTokenAmount; // Default: 0 SOLs or tokens, ignored in Auctioneer.
  tokens?: SplTokenAmount; // Default: token(1)
  bookkeeper?: Signer; // Default: identity
  printReceipt?: boolean; // Default: true

  confirmOptions?: ConfirmOptions;
};

BID

export declare type CreateBidInput = {
    auctionHouse: AuctionHouse;
    buyer?: PublicKey | Signer;
    authority?: PublicKey | Signer;
    auctioneerAuthority?: Signer;
    mintAccount: PublicKey;
    seller?: Option<PublicKey>;
    tokenAccount?: Option<PublicKey>;
    price?: SolAmount | SplTokenAmount;
    tokens?: SplTokenAmount;
    bookkeeper?: Signer;
    printReceipt?: boolean;
    confirmOptions?: ConfirmOptions;
};

EXECUTE SALE

export declare type ExecuteSaleInput = {
    auctionHouse: AuctionHouse;
    auctioneerAuthority?: Signer;
    listing: Listing;
    bid: Bid;
    bookkeeper?: Signer;
    printReceipt?: boolean;
    confirmOptions?: ConfirmOptions;
};

EXAMPLE:

mx.auctions().builders().list({ auctionHouse, mintAccount, price })
mx.auctions().builders().executeSale({ });
mx.auctions().builders().bid({ });

*/

const MetaplexProvider = props => {

  useEffect(() => {
    (async () => {
      try {
        // TODO: check environment
        const connection = new Connection(clusterApiUrl("devnet"));
        const mx = Metaplex.make(connection).use(guestIdentity());
        const auctionHouse = await mx.auctions().findAuctionHouseByAddress(new PublicKey(process.env.NEXT_PUBLIC_AUCTIONHOUSE)).run();
        // await mx.auctions().updateAuctionHouse(auctionHouse).run();
        console.log('auction house?', auctionHouse, mx.auctions().builders());
        
        console.log('metaplex nfts', mx.nfts().uploadMetadata);

        return { auctionHouse, mx };
      } catch (e) {
        console.log('error initializing metaplex', e);
      }
    })();

    return () => {};
  }, [])

  const { connected, ...walletContents } = useWallet();

  // walletAdapterIdentity({ publicKey: null })
  
  // if (connected === true) {
  //   console.log('wallet connected in metaplex', mx.auctions(), walletContents);
  // } else {
  //   console.log('wallet not connected in metaplex', mx.auctions(), walletContents);
  // }

  const getMetaplex = () => {
    console.log('returning metaplex');
    return;
  };

  return (
    <MetaplexContext.Provider value={getMetaplex}>
      {props.children}
    </MetaplexContext.Provider>
  );
};

export { MetaplexContext as default, MetaplexProvider };
