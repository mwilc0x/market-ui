import { roundToTwo } from "/utils/roundToTwo";
import { useQuery } from "@apollo/client";
import Masonry from "react-masonry-css";
import { useWallet } from "@solana/wallet-adapter-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cancelListingTransaction from "/utils/auctionhouse/CancelListing";

export default function Listings({ auctionhousePublicKey, query }) {
  const { publicKey, signTransaction } = useWallet();

  const { data, loading, error } = useQuery(query, {
    variables: {
      auctionHouses: auctionhousePublicKey,
    },
  });

  const cancelNftListing = async (nft) => {
    await cancelListingTransaction(nft, publicKey, signTransaction);
  };

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <>
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
      {loading && <p className="text-gray-300 text-sm">searching...</p>}
      {error && <p className="text-gray-300 text-sm">{error.message}</p>}
      {data && data.nfts && (
        <div className="mt-6 pt-6">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="masonry-grid"
            columnClassName="masonry-grid_column"
          >
            {data.nfts.map((nft, index) => (
              <div
                key={index}
                className="relative mb-10 p-2 rounded-lg shadow-[0_12px_40px_0px_rgba(0,0,0,0.06)] text-gray-500 border-gray-100 dark:border-gray-900 border-0 border-separate [border-spacing:0_0.5rem] hover:shadow-[0_12px_40px_0px_rgba(0,0,0,0.18)] dark:bg-zinc-800 dark:text-gray-100"
              >
                <img
                  src={nft.image}
                  className="object-center object-cover rounded-lg"
                />
                <p className="font-semibold text-gray-700 dark:text-gray-300 mt-2">
                  {nft.name}
                  <span className="float-right">
                    ◎{" "}
                    {nft.listings[0] &&
                      roundToTwo(nft.listings[0].price / 1000000000)}
                  </span>
                </p>
                <div className="mt-3 dark:text-gray-400">
                  {publicKey && (
                    <>
                      {nft.listings[0].seller === publicKey.toBase58() ? (
                        <div
                          className="rounded-[100px] backdrop-blur-lg bg-black/80 dark:bg-white/60 px-4 py-2 font-semibold cursor-pointer hover:scale-105 dark:text-black text-white w-fit float-left"
                          onClick={() => cancelNftListing(nft)}
                        >
                          Cancel
                        </div>
                      ) : (
                        <div
                          className="rounded-[100px] backdrop-blur-lg bg-black/80 dark:bg-white/60 px-4 py-2 font-semibold cursor-pointer hover:scale-105 dark:text-black text-white w-fit float-left"
                          onClick={() => buyNftTransaction(nft)}
                        >
                          Buy Now
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className="clear-both mb-2">{console.log(nft)}</div>
              </div>
            ))}
          </Masonry>
        </div>
      )}
    </>
  );
}
