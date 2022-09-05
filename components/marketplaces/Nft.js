import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { roundToTwo } from "/utils/roundToTwo";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { marketplaces } from "/utils/accounts";

export default function Nft({ nft, listing, subdomain, refetch }) {
  const { publicKey, signTransaction } = useWallet();
  const { setVisible } = useWalletModal();
  const [processing, setProcessing] = useState(false);

  let ah;
  try {
    ah = marketplaces.find((m) => m.auctionhouse === listing.auctionHouse.address);

    if (!ah) {
      return null;
    }
  } catch (e) {
    return null;
  }

  function marketplaceLink() {
    var url = "";
    if (subdomain) {
      url = `https://${subdomain}.holaplex.market/nfts/${nft.address}`;
    } else {
      switch (ah.name) {
        case "OpenSea":
          url = `https://opensea.io/assets/solana/${nft.mintAddress}`;
          break;
        case "MagicEden":
          url = `https://magiceden.io/item-details/${nft.mintAddress}`;
          break;
        case "Holaplex":
          url = `https://${subdomain}.holaplex.market/nfts/${nft.mintAddress}`;
          break;
      }
    }
    return url;
  }

  const buyNft = async (nft, listing) => {
    if (!publicKey) {
      setVisible(true);
      return;
    }
    setProcessing(true);
  };

  return (
    <div className="relative mb-10 p-2 rounded-lg shadow-[0_12px_40px_0px_rgba(0,0,0,0.06)] text-gray-500 border-gray-100 dark:border-gray-900 border-0 border-separate [border-spacing:0_0.5rem] hover:shadow-[0_12px_40px_0px_rgba(0,0,0,0.18)] dark:bg-zinc-800 dark:text-gray-100">
      <Link href={marketplaceLink()}>
        <a target="_blank">
          <Image
            alt={nft.name}
            src={nft.image}
            className="object-center object-cover rounded-lg"
            height="400"
            width="400"
          />
        </a>
      </Link>
      <p className="font-semibold text-gray-700 dark:text-gray-300 mt-2">
        {nft.name}
        <span className="float-right">
          ◎ {roundToTwo(listing.price / 1000000000)}
        </span>
      </p>
      <div className="mt-3 mb-2 dark:text-gray-400">
        {ah && (
          <button
            className="rounded-[100px] backdrop-blur-lg bg-black/80 disabled:bg-black/50 dark:bg-white/60 disabled:dark:bg-white/30 px-4 py-2 font-semibold hover:scale-105 disabled:hover:scale-100 dark:text-black text-white w-fit"
            onClick={() => buyNft(nft, listing)}
            disabled={processing}
          >
            {processing ? <span>Processing</span> : <span>Buy Now</span>}
          </button>
        )}
        {!subdomain && ah && (
          <div className="float-right rounded-[100px] backdrop-blur-lg bg-gray-100 dark:bg-black/60 px-4 py-2 font-semibold dark:text-white text-black w-fit">
            {ah.name}
          </div>
        )}
      </div>
    </div>
  );
}
