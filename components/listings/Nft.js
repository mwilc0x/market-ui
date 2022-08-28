import { useState } from "react";
import Image from "next/image";
import { roundToTwo } from "/utils/roundToTwo";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import cancelListingTransaction from "/utils/auctionhouse/CancelListing";
import buyNftTransaction from "/utils/auctionhouse/BuyNft";
import { marketplaces } from "/utils/marketplaceHelpers";

export default function Nft({ nft, listing, refetch }) {
  const { publicKey, signTransaction } = useWallet();
  const [processing, setProcessing] = useState(false);
  const { setVisible } = useWalletModal();

  const ah = marketplaces.find((m) => m.auctionhouse === listing.auctionHouse);

  const cancelNftListing = async (nft, listing) => {
    if (!publicKey) {
      setVisible(true);
      return;
    }
    setProcessing(true);
    await cancelListingTransaction(
      nft,
      listing,
      publicKey,
      signTransaction,
      refetch
    );
    setProcessing(false);
  };

  const buyNft = async (nft, listing) => {
    if (!publicKey) {
      setVisible(true);
      return;
    }
    setProcessing(true);
    await buyNftTransaction(
      nft,
      listing,
      publicKey,
      signTransaction,
      ah,
      refetch
    );
    setProcessing(false);
  };

  return (
    <div className="relative mb-10 p-2 rounded-lg shadow-[0_12px_40px_0px_rgba(0,0,0,0.06)] text-gray-500 border-gray-100 dark:border-gray-900 border-0 border-separate [border-spacing:0_0.5rem] hover:shadow-[0_12px_40px_0px_rgba(0,0,0,0.18)] dark:bg-zinc-800 dark:text-gray-100">
      <Image 
        alt="nft image" 
        src={nft.image} 
        className="object-center object-cover rounded-lg"
        width="400"
        height="400"
      />
      <p className="font-semibold text-gray-700 dark:text-gray-300 mt-2">
        {nft.name}
        <span className="float-right">
          ◎ {listing && roundToTwo(listing.price / 1000000000)}
        </span>
      </p>
      <div className="mt-3 dark:text-gray-400">
        {publicKey && (
          <>
            {listing.seller === publicKey.toBase58() ? (
              <button
                className="disabled:bg-black/50 disabled:dark:bg-white/30 disabled:hover:scale-100 rounded-[100px] backdrop-blur-lg bg-black/80 dark:bg-white/60 px-4 py-2 font-semibold hover:scale-105 dark:text-black text-white w-fit float-left"
                onClick={() => cancelNftListing(nft, listing)}
                disabled={processing}
              >
                {processing ? "Processing" : "Cancel"}
              </button>
            ) : (
              <div
                className="disabled:bg-black/50 disabled:dark:bg-white/30 disabled:hover:scale-100 rounded-[100px] backdrop-blur-lg bg-black/80 dark:bg-white/60 px-4 py-2 font-semibold cursor-pointer hover:scale-105 dark:text-black text-white w-fit float-left"
                onClick={() => buyNft(nft, listing)}
                disabled={processing}
              >
                {processing ? "Processing" : "Buy Now"}
              </div>
            )}
          </>
        )}
      </div>
      <div className="clear-both mb-2"></div>
    </div>
  );
}
