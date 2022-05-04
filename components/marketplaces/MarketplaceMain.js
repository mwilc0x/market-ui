import React, { useState } from "react";
import { gql } from "@apollo/client";
import Activity from "/components/marketplaces/Activity";

export default function MarketplaceMain() {
  const [subdomain, setSubdomain] = useState();
  const [publicKey, setPublicKey] = useState();

  function setSelected(m) {
    setSubdomain(m.subdomain);
    setPublicKey(m.auctionhouse);
  }

  const marketplaces = [
    {
      name: "Skeleton Crew",
      subdomain: "skeletoncrew",
      auctionhouse: "FPkkbSoGTBVi4v4PPmDfMBbX8sU8axxBCKTzAmp5cpnT",
    },
    {
      name: "Jungle Cats",
      subdomain: "junglecats",
      auctionhouse: "EsrVUnwaqmsq8aDyZ3xLf8f5RmpcHL6ym5uTzwCRLqbE",
    },
    {
      name: "PixelBands Music",
      subdomain: "pixelbands",
      auctionhouse: "CRDTvABrfuppnb85eA6a6nUPxDrujoWKDXNJ55QFvcYh",
    },
    {
      name: "Chimpions",
      subdomain: "thechimpions",
      auctionhouse: "GY6AmKzzGPXM7WAGRHnPMHzfcwsaBoVEvGjmdhQGK9oB",
    },
    {
      name: "MonkeDAO",
      subdomain: "monkedao",
      auctionhouse: "8Kzcg64oPBeY7S3DqQdbMws9ALjMebB5FsN8pPdVjk7v",
    },
    {
      name: "Soul Dogs City",
      subdomain: "cityshop",
      auctionhouse: "dwwdexYnLj3TcdWuvA8kPiNJ97joFtXFtTpJ1ztJ8p6",
    },
  ];

  const query = gql`
    query GetActivity($auctionHouses: PublicKey!) {
      activities(auctionHouses: [$auctionHouses]) {
        activityType
        createdAt
        nft {
          name
          address
          image(width: 1400)
          sellerFeeBasisPoints
          mintAddress
          description
          listings {
            price
            createdAt
            canceledAt
          }
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
        {subdomain && publicKey && (
          <Activity publicKey={publicKey} query={query} subdomain={subdomain} />
        )}
      </div>
    </>
  );
}
