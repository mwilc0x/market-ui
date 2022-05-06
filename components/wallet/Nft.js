import React, { useState } from "react";

export default function Nft({ nft }) {
  const [listingModal, setListingModal] = useState(false);

  return (
    <div className="mb-10 p-2 rounded-lg shadow-[0_12px_40px_0px_rgba(0,0,0,0.06)] text-gray-500 border-gray-100 dark:border-gray-900 border-0 border-separate [border-spacing:0_0.5rem] hover:shadow-[0_12px_40px_0px_rgba(0,0,0,0.18)] dark:bg-zinc-800 dark:text-gray-100">
      <img src={nft.image} className="object-center object-cover rounded-lg" />
      <p className="font-semibold text-gray-700 dark:text-gray-300 mt-2">
        {nft.name}
      </p>
      <div className="clear-both mb-1"></div>
    </div>
  );
}
