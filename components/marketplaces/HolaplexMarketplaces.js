import React, { useState } from "react";
import { gql } from "@apollo/client";
import { marketplaces } from "/utils/marketplaceHelpers";
import ListingsContainer from "/components/marketplaces/ListingsContainer";

export default function HolaplexMarketplaces() {
  const [subdomain, setSubdomain] = useState();
  const [auctionhousePublicKey, setAuctionhousePublicKey] = useState();

  function setSelected(m) {
    setSubdomain(m.subdomain);
    setAuctionhousePublicKey(m.auctionhouse);
  }

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
    <>
      <p className="dark:text-white">View Holaplex Marketplaces.</p>
      <div className="mt-8">
        {marketplaces.map((m, i) => (
          <button
            key={i}
            className={`mr-4 mb-4 rounded-lg inline bg-blue-500 px-4 py-2 text-white ${
              subdomain === m.subdomain
                ? "bg-blue-700 cursor-auto"
                : "cursor-pointer hover:bg-blue-600"
            }`}
            onClick={(e) => setSelected(m)}
          >
            {m.name}
          </button>
        ))}
        {subdomain && auctionhousePublicKey && (
          <ListingsContainer
            auctionhousePublicKey={auctionhousePublicKey}
            query={query}
            subdomain={subdomain}
          />
        )}
      </div>
    </>
  );
}
