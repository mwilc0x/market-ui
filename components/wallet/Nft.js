import React, { useState } from "react";
import SellModal from "/components/wallet/SellModal";

export default function Nft({ nft }) {
  const [listingModal, setListingModal] = useState(false);

  function handleCloseModal() {
    setListingModal(false);
  }

  return (
    <div className="mb-10 p-2 rounded-lg shadow-[0_12px_40px_0px_rgba(0,0,0,0.06)] text-gray-500 border-gray-100 dark:border-gray-900 border-0 border-separate [border-spacing:0_0.5rem] hover:shadow-[0_12px_40px_0px_rgba(0,0,0,0.18)] dark:bg-zinc-800 dark:text-gray-100">
      <img src={nft.image} className="object-center object-cover rounded-lg" />
      <p className="font-semibold text-gray-700 dark:text-gray-300 mt-2">
        {nft.name}
        <span className="float-right">◎ price</span>
      </p>
      <div className="mt-3 dark:text-gray-400">
        <div
          className="rounded-[100px] cursor-pointer hover:scale-105 backdrop-blur-lg bg-black/10 dark:bg-black/60 px-4 py-2 font-semibold text-neutral-500 dark:text-white w-fit float-left"
          onClick={(e) => setListingModal(!listingModal)}
        >
          List Now
        </div>
      </div>
      <div className="clear-both mb-1"></div>
      <SellModal open={listingModal} nft={nft} closeModal={handleCloseModal} />
    </div>
  );
}
