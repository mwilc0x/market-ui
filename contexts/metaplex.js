import React, { createContext } from "react";
import {
  useWallet
} from "@solana/wallet-adapter-react";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { Metaplex, WalletAdapterIdentityDriver } from "@metaplex-foundation/js";

// TODO: check environment
const connection = new Connection(clusterApiUrl("devnet"));
const metaplex = new Metaplex(connection);

// console.log('metaplex use:', metaplex.use);
// console.log('metaplex identity', metaplex.identity);
// console.log('metaplex auctions', metaplex.auctions());
// console.log('wallet adapter identity driver', WalletAdapterIdentityDriver);

const MetaplexContext = createContext();

const MetaplexProvider = props => {
  const { connected } = useWallet();
  
  if (connected === true) {
    console.log('wallet connected in metaplex');
  } else {
    console.log('wallet not connected in metaplex');
  }

  const getMetaplex = () => {
    console.log('returning metaplex');
    return metaplex;
  };

  return (
    <MetaplexContext.Provider value={getMetaplex}>
      {props.children}
    </MetaplexContext.Provider>
  );
};

export { MetaplexContext as default, MetaplexProvider };
