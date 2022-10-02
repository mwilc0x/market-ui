import React, { createContext, useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";

const MetaplexContext = createContext();

const MetaplexProvider = props => {
  let [loading, setLoading] = useState(true);
  let [mxCtx, setMxCtx] = useState({});

  const wallet = useWallet();

  useEffect(() => {
    (async () => {
      try {
        const connection = new Connection(clusterApiUrl(process.env.NEXT_PUBLIC_SOLANA_ENV));
        // default guest identity
        // connect wallet for each specific call
        const mx = Metaplex.make(connection); 

        const auctionHouse = await mx.auctionHouse().findByAddress({
          address: new PublicKey(process.env.NEXT_PUBLIC_AUCTIONHOUSE)
        }).run();

        console.log('hey', auctionHouse);

        setMxCtx({ mx, auctionHouse });
        setLoading(false);
        return;
      } catch (e) {
        console.log('error initializing metaplex', e);
      }
    })();

    return () => {};
  }, [wallet])

  return (
    <MetaplexContext.Provider value={{ loading, mxCtx }}>
      {props.children}
    </MetaplexContext.Provider>
  );
};

export { MetaplexContext as default, MetaplexProvider };
