import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { CSVLink } from "react-csv";
import ListView from "/components/ListView";
import GridView from "/components/GridView";
import {
  ViewListIcon,
  ViewGridIcon,
  DocumentDownloadIcon,
} from "@heroicons/react/outline";

const GET_NFT = gql`
  query GetNft($address: [PublicKey!]) {
    nfts(creators: $address, offset: 0, limit: 100000) {
      name
      address
      image(width: 1400)
      sellerFeeBasisPoints
      mintAddress
      description
      owner {
        address
      }
    }
  }
`;

export default function FindByCreatorSearch({ address }) {
  const [display, setDisplay] = useState("list");

  const { data, loading, error } = useQuery(GET_NFT, {
    variables: {
      address: address,
    },
  });

  const downloadJson = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data.nfts.map((nft) => nft.mintAddress))
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "mintlist.json";
    link.click();
  };

  return (
    <>
      {loading && <p className="text-gray-300 text-sm">searching...</p>}
      {error && <p className="text-gray-300 text-sm">{error.message}</p>}
      {data && data.nfts && data.nfts.length === 0 && <p>0 results</p>}
      {data && data.nfts && data.nfts.length > 0 && (
        <div className="mt-20 pt-6 border-t-2 border-gray-100">
          <h1 className="text-lg font-bold text-gray-600 mb-4">Results</h1>
          <div className="float-left">
            <div
              className={`inline rounded-lg p-2 border border-gray-300 hover:bg-gray-100 align-middle ${
                display === "list" ? "bg-gray-100" : "bg-gray-200"
              }`}
            >
              <ViewListIcon
                className="h-6 w-6 inline cursor-pointer"
                aria-hidden="true"
                onClick={() => setDisplay("list")}
              />
            </div>
            <div
              className={`inline rounded-lg p-2 border border-gray-300 hover:bg-gray-100 align-middle ml-2 ${
                display === "grid" ? "bg-gray-100" : "bg-gray-200"
              }`}
            >
              <ViewGridIcon
                className="h-6 w-6 inline cursor-pointer"
                aria-hidden="true"
                onClick={() => setDisplay("grid")}
              />
            </div>
          </div>
          <div className="float-right">
            <CSVLink
              data={data.nfts.map((nft) => ({
                name: nft.name,
                description: nft.description,
                mint: nft.mintAddress,
                image: nft.image,
                owner: nft.owner.address,
              }))}
              filename={"mints.csv"}
              className="inline bg-amber-400 hover:bg-amber-500 text-white px-4 py-3 text-md leading-4 rounded-lg"
            >
              <DocumentDownloadIcon
                className="h-6 w-6 inline cursor-pointer mr-1 align-middle -mt-1"
                aria-hidden="true"
              />
              Details CSV
            </CSVLink>
            <a
              onClick={downloadJson}
              className="inline bg-amber-400 hover:bg-amber-500 text-white px-4 py-3 text-md leading-4 rounded-lg ml-2 cursor-pointer"
            >
              <DocumentDownloadIcon
                className="h-6 w-6 inline cursor-pointer mr-1 align-middle -mt-1"
                aria-hidden="true"
              />
              Mint List JSON
            </a>
          </div>
          {display === "list" ? (
            <ListView nfts={data.nfts} />
          ) : (
            <GridView nfts={data.nfts} />
          )}
        </div>
      )}
    </>
  );
}
