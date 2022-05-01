import React, { useState } from "react";
import FindByCreatorSearch from "/components/FindByCreatorSearch";

export default function FindByCreator() {
  const [address, setAddress] = useState();

  const doSearch = async (e) => {
    const addy = document.getElementById("address").value;
    setAddress(addy);
  };

  return (
    <>
      <article className="prose prose-slate">
        <p>Find NFT&apos;s minted by public key.</p>
        <input
          id="address"
          className="border border-gray-200 px-4 py-2 w-full rounded-lg inline"
        />
        <button
          className="rounded-lg inline ml-1 bg-blue-500 px-4 py-2 text-white float-right mt-2 hover:bg-blue-600 disabled:bg-gray-300"
          onClick={(e) => doSearch(e)}
        >
          Search
        </button>
      </article>
      <FindByCreatorSearch address={address} />
    </>
  );
}
