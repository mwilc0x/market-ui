import { useQuery } from "@apollo/client";
import Masonry from "react-masonry-css";
import Nft from "/components/wallet/Nft";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function WalletContents({ address, query }) {
  const { data, loading, error } = useQuery(query, {
    variables: {
      address: address,
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
      {data && data.nfts && data.nfts.length === 0 && <p>0 results</p>}
      {data && data.nfts && data.nfts.length > 0 && (
        <div className="mt-20 w-full">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="masonry-grid"
            columnClassName="masonry-grid_column"
          >
            {data.nfts.map((nft, index) => (
              <Nft key={index} nft={nft} />
            ))}
          </Masonry>
        </div>
      )}
    </>
  );
}
