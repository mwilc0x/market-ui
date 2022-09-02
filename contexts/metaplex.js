import React, { createContext, useEffect, useState } from "react";
import {
  useWallet
} from "@solana/wallet-adapter-react";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";

const MetaplexContext = createContext();

const MetaplexProvider = props => {
  let [mxCtx, setMxCtx] = useState({});

  const wallet = useWallet();

  useEffect(() => {
    (async () => {
      try {
        const connection = new Connection(clusterApiUrl("devnet")); // TODO: check environment
        const mx = Metaplex.make(connection).use(walletAdapterIdentity(wallet));
        const auctionHouse = await mx.auctions().findAuctionHouseByAddress(new PublicKey(process.env.NEXT_PUBLIC_AUCTIONHOUSE)).run();

        setMxCtx({ mx, auctionHouse });
        return;
      } catch (e) {
        console.log('error initializing metaplex', e);
      }
    })();

    return () => {};
  }, [wallet])

  return (
    <MetaplexContext.Provider value={{ mxCtx }}>
      {props.children}
    </MetaplexContext.Provider>
  );
};

export { MetaplexContext as default, MetaplexProvider };
