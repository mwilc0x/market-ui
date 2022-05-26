import { gql } from "@apollo/client";
import Listings from "/components/listings/Listings";

export default function ListingsContainer() {
  const query = gql`
    query GetNfts($auctionHouses: PublicKey!) {
      nfts(
        auctionHouses: [$auctionHouses]
        offset: 0
        limit: 10000
        listed: true
      ) {
        name
        address
        image(width: 1400)
        sellerFeeBasisPoints
        mintAddress
        description
        listings {
          address
          price
          createdAt
          canceledAt
          seller
          tradeState
          metadata
          tradeStateBump
          purchaseReceipt
          tokenSize
          bump
          auctionHouse
        }
        offers {
          address
          tradeState
          price
          buyer
          createdAt
          tradeState
        }
        purchases {
          price
          createdAt
        }
        owner {
          associatedTokenAccountAddress
          address
        }
        creators {
          address
        }
      }
    }
  `;

  return (
    <Listings
      auctionhousePublicKey={process.env.NEXT_PUBLIC_AUCTIONHOUSE}
      query={query}
    />
  );
}
