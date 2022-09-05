import React, { useState } from "react";
import ListingsContainer from "/components/marketplaces/ListingsContainer";
import { collections } from "/utils/accounts";
import { getAuctionhouseNftsQuery } from '../../utils/graphql';

export default function AllAuctionHouses() {
  const [selectedCollection, setSelectedCollection] = useState();
  const [creatorPublicKey, setCreatorPublicKey] = useState();

  function setSelected(c) {
    setCreatorPublicKey(c.creator);
    setSelectedCollection(c.name);
  }

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
            query={getAuctionhouseNftsQuery}
          />
        )}
      </div>
    </>
  );
}
