import React, { useState } from "react";
import { marketplaces } from "/utils/accounts";
import ListingsContainer from "/components/marketplaces/ListingsContainer";
import { getHolaplexNftsQuery } from '../../utils/graphql';

export default function HolaplexMarketplaces() {
  const [subdomain, setSubdomain] = useState();
  const [auctionhousePublicKey, setAuctionhousePublicKey] = useState();

  function setSelected(m) {
    setSubdomain(m.subdomain);
    setAuctionhousePublicKey(m.auctionhouse);
  }

  return (
    <>
      <p className="dark:text-white">View Holaplex Marketplaces.</p>
      <div className="mt-8">
        {marketplaces
          .filter((m) => m.subdomain)
          .map((m, i) => (
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
            query={getHolaplexNftsQuery}
            subdomain={subdomain}
          />
        )}
      </div>
    </>
  );
}
