import { useContext, useEffect, useState } from 'react';
import { gql } from "@apollo/client";
import { useWallet } from "@solana/wallet-adapter-react";
import WalletContents from "/components/wallet/WalletContents";
import MetaplexContext from '../../contexts/metaplex';
import { walletAdapterIdentity } from '@metaplex-foundation/js';

const query = gql`
  query GetNfts($address: [PublicKey!]) {
    nfts(owners: $address, offset: 0, limit: 100000) {
      name
      address
      image(width: 1400)
      sellerFeeBasisPoints
      mintAddress
      description
      owner {
        associatedTokenAccountAddress
        address
      }
      listings {
        price
        createdAt
        canceledAt
        seller
        tradeState
        metadata
        tradeStateBump
        tokenSize
        auctionHouse {
          address
        }
      }
    }
  }
`;

export default function ConnectedWallet() {
  const wallet = useWallet();
  const [ownerNfts, setOwnerNfts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { loading: mxLoading, mxCtx: { mx } } = useContext(MetaplexContext);
  
  useEffect(() => {
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
  }, [mxLoading])

  return <WalletContents
    error={error}
    loading={loading} 
    nfts={ownerNfts} 
    address={wallet.publicKey} 
  />;
}
