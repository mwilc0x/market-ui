import { useQuery } from "@apollo/client";
import Masonry from "react-masonry-css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nft from "/components/listings/Nft";

export default function Listings({ auctionhousePublicKey, query }) {
  const { data, loading, error, refetch } = useQuery(query, {
    variables: {
      auctionHouses: auctionhousePublicKey,
    },
  });

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
            {data.nfts.map((nft) => (
              <div key={nft.address}>
                {nft.listings
                  .filter(
                    (l) =>
                      l.auctionHouse === auctionhousePublicKey &&
                      l.seller === nft.owner.address
                  )
                  .map((listing) => (
                    <Nft
                      key={listing.address}
                      nft={nft}
                      listing={listing}
                      refetch={refetch}
                    />
                  ))}
              </div>
            ))}
          </Masonry>
        </div>
      )}
    </>
  );
}
