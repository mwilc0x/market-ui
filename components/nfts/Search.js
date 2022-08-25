import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { CSVLink } from "react-csv";
import ListView from "/components/nfts/ListView";
import GridView from "/components/nfts/GridView";
import {
  ListBulletIcon,
  Squares2X2Icon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";

export default function Search({ address, query, searchBy }) {
  const [display, setDisplay] = useState("list");

  const { data, loading, error } = useQuery(query, {
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

  const csvData = data
    ? searchBy === "creator"
      ? data.nfts.map((nft) => ({
          name: nft.name,
          description: nft.description,
          mint: nft.mintAddress,
          image: nft.image,
          owner: nft.owner.address,
        }))
      : data.nfts.map((nft) => ({
          name: nft.name,
          description: nft.description,
          mint: nft.mintAddress,
          image: nft.image,
        }))
    : null;

  return (
    <>
      {loading && <p className="text-gray-300 text-sm">searching...</p>}
      {error && <p className="text-gray-300 text-sm">{error.message}</p>}
      {data && data.nfts && data.nfts.length === 0 && <p>0 results</p>}
      {data && data.nfts && data.nfts.length > 0 && (
        <div className="mt-20 pt-6 border-t-2 border-gray-100 dark:border-gray-700">
          <h1 className="text-lg font-bold text-gray-600 mb-4 dark:text-gray-200">
            Results
          </h1>
          <div className="float-left">
            <div
              className={`inline rounded-lg p-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 align-middle ${
                display === "list"
                  ? "bg-gray-100 dark:bg-gray-700"
                  : "bg-gray-200 dark:bg-gray-800"
              }`}
            >
              <ListBulletIcon
                className="h-6 w-6 inline cursor-pointer -mt-0.5"
                aria-hidden="true"
                onClick={() => setDisplay("list")}
              />
            </div>
            <div
              className={`inline rounded-lg p-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 align-middle ml-2 ${
                display === "grid"
                  ? "bg-gray-100 dark:bg-gray-700"
                  : "bg-gray-200 dark:bg-gray-800"
              }`}
            >
              <Squares2X2Icon
                className="h-6 w-6 inline cursor-pointer -mt-0.5"
                aria-hidden="true"
                onClick={() => setDisplay("grid")}
              />
            </div>
          </div>
          <div className="float-right">
            <CSVLink
              data={csvData}
              filename={"mints.csv"}
              className="inline bg-amber-400 hover:bg-amber-500 dark:bg-amber-500 dark:hover:bg-amber-600 text-white px-4 py-3 text-md leading-4 rounded-lg"
            >
              <DocumentArrowDownIcon
                className="h-6 w-6 inline cursor-pointer mr-1 align-middle -mt-1"
                aria-hidden="true"
              />
              Details CSV
            </CSVLink>
            <a
              onClick={downloadJson}
              className="inline bg-amber-400 hover:bg-amber-500 dark:bg-amber-500 dark:hover:bg-amber-600 text-white px-4 py-3 text-md leading-4 rounded-lg ml-2 cursor-pointer"
            >
              <DocumentArrowDownIcon
                className="h-6 w-6 inline cursor-pointer mr-1 align-middle -mt-1"
                aria-hidden="true"
              />
              JSON
            </a>
          </div>
          {display === "list" ? (
            <ListView nfts={data.nfts} searchBy={searchBy} />
          ) : (
            <GridView nfts={data.nfts} searchBy={searchBy} />
          )}
        </div>
      )}
    </>
  );
}
