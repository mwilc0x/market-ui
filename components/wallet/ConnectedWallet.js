import { useContext, useEffect, useState } from 'react';
import { useWallet } from "@solana/wallet-adapter-react";
import WalletContents from "/components/wallet/WalletContents";
import MetaplexContext from '../../contexts/metaplex';
import { walletAdapterIdentity } from '@metaplex-foundation/js';
import { parseOwnerNftListings } from '../../utils/auctionHouse';

export default function ConnectedWallet() {
  const wallet = useWallet();
  const [init, setInit] = useState(false);
  const [ownerNfts, setOwnerNfts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { loading: mxLoading, mxCtx: { auctionHouse, mx } } = useContext(MetaplexContext);
  
  useEffect(() => {
    if (mxLoading === true) {
      return;
    }

    setInit(true);

    try {
      const getAllOwnerNfts = async () => {
        const ownerNftListings = await mx
          .use(walletAdapterIdentity(wallet))
          .auctionHouse()
          .findListings({
            seller: mx.identity().publicKey,
            auctionHouse,
          });

        const ownerNfts = await mx
          .use(walletAdapterIdentity(wallet))
          .nfts()
          .findAllByOwner({ owner: mx.identity().publicKey });

        parseOwnerNftListings(ownerNftListings);        
        setOwnerNfts(ownerNfts);
        setLoading(false);
      }
  
      getAllOwnerNfts();
    } catch (e) {
      console.log('Error loading NFTs', e);
      setError(error);
    }
  }, [mxLoading])

  return <WalletContents
    error={error}
    loading={loading} 
    nfts={ownerNfts} 
    address={wallet.publicKey} 
  />;
}
