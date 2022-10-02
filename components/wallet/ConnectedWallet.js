import { useContext, useEffect, useState } from 'react';
import { useWallet } from "@solana/wallet-adapter-react";
import WalletContents from "/components/wallet/WalletContents";
import MetaplexContext from '../../contexts/metaplex';
import { walletAdapterIdentity } from '@metaplex-foundation/js';

export default function ConnectedWallet() {
  const wallet = useWallet();
  const [ownerNfts, setOwnerNfts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { loading: mxLoading, mxCtx: { mx } } = useContext(MetaplexContext);
  
  useEffect(() => {
    if (mxLoading === true) {
      return;
    }

    try {
      const getAllOwnerNfts = async () => {
        const ownerNfts = await mx
          .use(walletAdapterIdentity(wallet))
          .nfts()
          .findAllByOwner({ owner: mx.identity().publicKey })
          .run();
  
        setOwnerNfts(ownerNfts);
        setLoading(false);
      }
  
      getAllOwnerNfts();
    } catch (e) {
      console.log('Error loading NFTs', e);
      setError(error);
    }
  }, [mxLoading, error, mx, wallet])

  return <WalletContents
    error={error}
    loading={loading} 
    nfts={ownerNfts} 
    address={wallet.publicKey} 
  />;
}
