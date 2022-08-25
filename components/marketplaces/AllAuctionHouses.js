import React, { useState } from "react";
import { gql } from "@apollo/client";
import ListingsContainer from "/components/marketplaces/ListingsContainer";
import { collections } from "/utils/marketplaceHelpers";

export default function AllAuctionHouses() {
  const [selectedCollection, setSelectedCollection] = useState();
  const [creatorPublicKey, setCreatorPublicKey] = useState();

  function setSelected(c) {
    setCreatorPublicKey(c.creator);
    setSelectedCollection(c.name);
  }

  const query = gql`
    query GetNfts($creators: [PublicKey!]) {
      nfts(creators: $creators, offset: 0, limit: 10000, listed: true) {
        name
        address
        image(width: 1400)
        sellerFeeBasisPoints
        mintAddress
        description
        activities {
          metadata
          auctionHouse {
            address
          }
          price
          createdAt
          activityType
        }
        listings {
          auctionHouse {
            address
          }
          seller
          metadata
          price
          tokenSize
          tradeState
          tradeStateBump
          createdAt
          canceledAt
        }
        offers {
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
    <>
      <p className="dark:text-white">All AuctionHouse&apos;s by Collection.</p>
      <div className="mt-8">
        {collections.map((c, i) => (
          <button
            key={i}
            className={`mr-4 mb-4 rounded-lg inline bg-blue-500 px-4 py-2 text-white ${
              selectedCollection === c.name
                ? "bg-blue-700 cursor-auto"
                : "cursor-pointer hover:bg-blue-600"
            }`}
            onClick={(e) => setSelected(c)}
          >
            {c.name}
          </button>
        ))}
        {selectedCollection && (
          <ListingsContainer
            creatorPublicKey={creatorPublicKey}
            query={query}
          />
        )}
      </div>
    </>
  );
}
