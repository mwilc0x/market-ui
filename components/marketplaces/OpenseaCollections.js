import React, { useState } from "react";
import { gql } from "@apollo/client";
import ListingsContainer from "/components/marketplaces/ListingsContainer";

export default function OpenseaCollections() {
  const [subdomain, setSubdomain] = useState();
  const [auctionhousePublicKey, setAuctionhousePublicKey] = useState();
  const [creatorPublicKey, setCreatorPublicKey] = useState();

  function setSelected(m) {
    setAuctionhousePublicKey(m.auctionhouse);
    setCreatorPublicKey(m.creator);
    setSubdomain(m.subdomain);
  }

  // Opensea 3o9d13qUvEuuauhFrVom1vuCzgNsJifeaBYDPquaT73Y
  // MagicEden GWErq8nJf5JQtohg5k7RTkiZmoCxvGBJqbMSfkrxYFFy
  // Holaplex??? 9SvsTjqk3YoicaYnC4VW1f8QAN9ku7QCCk6AyfUdzc9t

  const marketplaces = [
    {
      name: "Grim Syndicate",
      subdomain: "grimsyndicate",
      auctionhouse: "GWErq8nJf5JQtohg5k7RTkiZmoCxvGBJqbMSfkrxYFFy",
      creator: ["DnP3GRVqtR9vjxMZH4PcFuGZ4ZqhbNqoGzJuTrHACK6f"],
    },
    {
      name: "Degenerate Ape Academy",
      subdomain: "degenape",
      auctionhouse: "GWErq8nJf5JQtohg5k7RTkiZmoCxvGBJqbMSfkrxYFFy",
      creator: ["DC2mkgwhy56w3viNtHDjJQmc7SGu2QX785bS4aexojwX"],
    },
    {
      name: "Okay Bears",
      subdomain: "okaybears",
      auctionhouse: "GWErq8nJf5JQtohg5k7RTkiZmoCxvGBJqbMSfkrxYFFy",
      creator: ["3xVDoLaecZwXXtN59o6T3Gfxwjcgf8Hc9RfoqBn995P9"],
    },
    {
      name: "Solana Monkey Business",
      subdomain: "smb",
      auctionhouse: "GWErq8nJf5JQtohg5k7RTkiZmoCxvGBJqbMSfkrxYFFy",
      creator: ["9uBX3ASjxWvNBAD1xjbVaKA74mWGZys3RGSF7DdeDD3F"],
    },
    {
      name: "Famous Fox Federation",
      subdomain: "famousfox",
      auctionhouse: "GWErq8nJf5JQtohg5k7RTkiZmoCxvGBJqbMSfkrxYFFy",
      creator: ["D3XrkNZz6wx6cofot7Zohsf2KSsu2ArngNk8VqU9cTY3"],
    },
  ];

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
          address
          metadata
          auctionHouse
          price
          createdAt
          wallets
          activityType
        }
        listings {
          address
          auctionHouse
          bookkeeper
          seller
          metadata
          purchaseReceipt
          price
          tokenSize
          bump
          tradeState
          tradeStateBump
          createdAt
          canceledAt
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
      <p className="dark:text-white">View Opensea Collections.</p>
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
            creatorPublicKey={creatorPublicKey}
            query={query}
            source="opensea"
          />
        )}
      </div>
    </>
  );
}
