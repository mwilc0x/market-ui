import { gql } from "@apollo/client";
import { useWallet } from "@solana/wallet-adapter-react";
import WalletContents from "/components/wallet/WalletContents";

export default function ConnectedWallet() {
  const { publicKey } = useWallet();

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

  return <WalletContents query={query} address={publicKey} />;
}
