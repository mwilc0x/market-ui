import Masonry from "react-masonry-css";
import Nft from "/components/wallet/Nft";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function WalletContents({ error, loading, nfts }) {
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
      {nfts && nfts.length === 0 && <p>0 results</p>}
      {nfts && nfts.length > 0 && (
        <div className="mt-20 w-full">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="masonry-grid"
            columnClassName="masonry-grid_column"
          >
            {nfts.map((nft, index) => (
              <Nft key={index} nft={nft} refetch={() => {}} />
            ))}
          </Masonry>
        </div>
      )}
    </>
  );
}
