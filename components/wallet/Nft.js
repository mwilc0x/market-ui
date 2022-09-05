import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { roundToTwo } from "/utils/roundToTwo";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import SellModal from "/components/wallet/SellModal";
import MetaplexContext from '../../contexts/metaplex';
import { walletAdapterIdentity } from '@metaplex-foundation/js';

export default function Nft({ nft, refetch }) {
  const [metadata, setMetadata] = useState(null);
  const [listingModal, setListingModal] = useState(false);
  const auctionHouse = process.env.NEXT_PUBLIC_AUCTIONHOUSE;
  const listing = nft?.listings?.find((l) => l.auctionHouse === auctionHouse);
  const wallet = useWallet();
  const [processing, setProcessing] = useState(false);
  const { setVisible } = useWalletModal();

  const { publicKey, signTransaction } = wallet;

  const { mxCtx: { mx } } = useContext(MetaplexContext); 

  useEffect(() => {
    const loadNftMetadata = async () => {
      const metadata = await mx
        .use(walletAdapterIdentity(wallet))
        .nfts()
        .load({ metadata: nft })
        .run();
      setMetadata(metadata);
    }

    loadNftMetadata();
  }, [nft]);

  const handleImageClick = () => {
    if (!metadata) {
      return;
    }

    window.open(`${document.location.origin}/nft/${metadata?.address.toString()}`);
  }

  const cancelNftListing = async (nft, listing) => {
    if (!publicKey) {
      setVisible(true);
      return;
    }
    setProcessing(true);
  };

  function handleCloseModal() {
    setListingModal(false);
  }

  if (!metadata) {
    return null;
  }

  const nftName = metadata?.name || "No NFT name";

  return (
    <div className="mb-10 p-2 rounded-lg shadow-[0_12px_40px_0px_rgba(0,0,0,0.06)] text-gray-500 border-gray-100 dark:border-gray-900 border-0 border-separate [border-spacing:0_0.5rem] hover:shadow-[0_12px_40px_0px_rgba(0,0,0,0.18)] dark:bg-zinc-800 dark:text-gray-100">
      <Image 
        alt="nft image"
        src={metadata.json.image}
        className="object-center object-cover rounded-lg cursor-pointer"
        height="400"
        width="400"
        onClick={handleImageClick}
      />
      {listing ? (
        <>
          <p className="font-semibold text-gray-700 dark:text-gray-300 mt-2 float-left">
            {nftName}
          </p>
          <span className="float-right mt-2">
            ◎ {listing && roundToTwo(listing.price / 1000000000)}
          </span>
          <div className="dark:text-gray-400 clear-both">
            <button
              className="disabled:bg-black/50 disabled:dark:bg-white/30 disabled:hover:scale-100 mt-3 rounded-[100px] hover:scale-105 backdrop-blur-lg bg-black/10 dark:bg-black/60 px-4 py-2 font-semibold text-neutral-500 dark:text-white w-fit float-left"
              onClick={() => cancelNftListing(metadata, listing)}
              disabled={processing}
            >
              {processing ? "Processing" : "Cancel"}
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="font-semibold text-gray-700 dark:text-gray-300 mt-2">
            {nftName}
          </p>
          <div className="mt-3 dark:text-gray-400">
            <div
              className="rounded-[100px] cursor-pointer hover:scale-105 backdrop-blur-lg bg-black/10 dark:bg-black/60 px-4 py-2 font-semibold text-neutral-500 dark:text-white w-fit float-left"
              onClick={(e) => setListingModal(!listingModal)}
            >
              List Now
            </div>
          </div>
        </>
      )}
      <div className="clear-both mb-1"></div>
      <SellModal
        open={listingModal}
        nft={metadata}
        closeModal={handleCloseModal}
        refetch={refetch}
      />
    </div>
  );
}
