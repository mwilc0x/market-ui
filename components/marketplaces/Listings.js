import Link from "next/link";
import Masonry from "react-masonry-css";
import { roundToTwo } from "/utils/roundToTwo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useWallet } from "@solana/wallet-adapter-react";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Listings({ nfts, subdomain, source }) {
  const { publicKey, wallet } = useWallet();

  nfts = nfts.filter((nft) => nft.listings[0].seller === nft.owner.address);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const auctionHouseName = {
    "3o9d13qUvEuuauhFrVom1vuCzgNsJifeaBYDPquaT73Y": "OpenSea",
    GWErq8nJf5JQtohg5k7RTkiZmoCxvGBJqbMSfkrxYFFy: "MagicEden",
    "9SvsTjqk3YoicaYnC4VW1f8QAN9ku7QCCk6AyfUdzc9t": "Holaplex",
    FPkkbSoGTBVi4v4PPmDfMBbX8sU8axxBCKTzAmp5cpnT: "SkeletonCrew",
    EsrVUnwaqmsq8aDyZ3xLf8f5RmpcHL6ym5uTzwCRLqbE: "Jungle Cats",
    CRDTvABrfuppnb85eA6a6nUPxDrujoWKDXNJ55QFvcYh: "PixelBands",
    GY6AmKzzGPXM7WAGRHnPMHzfcwsaBoVEvGjmdhQGK9oB: "Chimpions",
    "8Kzcg64oPBeY7S3DqQdbMws9ALjMebB5FsN8pPdVjk7v": "MonkeDAO",
    dwwdexYnLj3TcdWuvA8kPiNJ97joFtXFtTpJ1ztJ8p6: "CityShop",
  };

  function marketplaceLink(address, mint, auctionHouse) {
    var url;
    switch (auctionHouseName[auctionHouse]) {
      case "OpenSea":
        url = `https://opensea.io/assets/solana/${mint}`;
        break;
      case "MagicEden":
        url = `https://opensea.io/assets/solana/${mint}`;
        break;
      case "Holaplex":
        url = `https://holaplex.com/nfts/${address}`;
        break;
      case "SkeletonCrew" ||
        "Jungle Cats" ||
        "PixelBands" ||
        "Chimpions" ||
        "MonkeDAO" ||
        "CityShop":
        url = `https://${subdomain}.holaplex.market/nfts/${address}`;
        break;
      default:
        url = "";
    }
    return url;
  }

  return (
    <div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <h1 className="text-lg font-bold text-gray-600 mb-4 dark:text-gray-200 w-fit float-left">
        {nfts.length} Listings
      </h1>
      <div className="float-right">
        <WalletMultiButton />
      </div>
      <div className="clear-both mb-6"></div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {nfts.map((nft, index) => (
          <div
            key={index}
            className="relative mb-10 p-2 rounded-lg shadow-[0_12px_40px_0px_rgba(0,0,0,0.06)] text-gray-500 border-gray-100 dark:border-gray-900 border-0 border-separate [border-spacing:0_0.5rem] hover:shadow-[0_12px_40px_0px_rgba(0,0,0,0.18)] dark:bg-zinc-800 dark:text-gray-100"
          >
            <Link
              href={marketplaceLink(
                nft.address,
                nft.mintAddress,
                nft.listings[0].auctionHouse
              )}
              key={index}
            >
              <a target="_blank">
                <img
                  src={nft.image}
                  className="object-center object-cover rounded-lg"
                />
              </a>
            </Link>
            <p className="font-semibold text-gray-700 dark:text-gray-300 mt-2">
              {nft.name}
              <span className="float-right">
                ◎
                {nft.listings[0] &&
                  roundToTwo(nft.listings[0].price / 1000000000)}
              </span>
            </p>
            <div className="mt-3 dark:text-gray-400">
              <div
                className="rounded-[100px] backdrop-blur-lg bg-black/80 dark:bg-white/60 px-4 py-2 font-semibold cursor-pointer hover:scale-105 dark:text-black text-white w-fit float-left"
                onClick={() => buyNftTransaction(nft)}
              >
                Buy Now
              </div>
              <div className="rounded-[100px] backdrop-blur-lg bg-black/10 dark:bg-black/60 px-4 py-2 font-semibold text-neutral-500 dark:text-white w-fit float-right">
                {auctionHouseName[nft.listings[0].auctionHouse] || "Unknown"}
              </div>
            </div>
            <div className="clear-both mb-2">{console.log(nft)}</div>
          </div>
        ))}
      </Masonry>
    </div>
  );
}
