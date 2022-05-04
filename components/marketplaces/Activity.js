import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import Listings from "/components/marketplaces/Listings";

export default function Activity({ publicKey, query, subdomain }) {
  const { data, loading, error } = useQuery(query, {
    variables: {
      auctionHouses: publicKey,
    },
  });

  return (
    <>
      {loading && <p className="text-gray-300 text-sm">searching...</p>}
      {error && <p className="text-gray-300 text-sm">{error.message}</p>}
      {data && data.activities && (
        <div className="mt-6 pt-6 border-t-2 border-gray-100 dark:border-gray-700">
          <Listings
            subdomain={subdomain}
            nfts={data.activities
              .filter((a) => a.activityType === "listing")
              .map((x) => x.nft)}
          />
        </div>
      )}
    </>
  );
}
