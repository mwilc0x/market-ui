import Masonry from "react-masonry-css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Nft from "/components/marketplaces/Nft";

export default function Listings({ nfts, subdomain, auctionHouse }) {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

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
        {nfts.map((nft) => (
          <>
            {nft.listings
              .filter(
                (l) =>
                  l.auctionHouse === auctionHouse &&
                  l.seller === nft.owner.address
              )
              .map((listing) => (
                <Nft
                  key={listing.address}
                  nft={nft}
                  listing={listing}
                  subdomain={subdomain}
                />
              ))}
          </>
        ))}
      </Masonry>
    </div>
  );
}
