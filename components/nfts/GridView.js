import Masonry from "react-masonry-css";
import Image from "next/image";

export default function GridView({ nfts, searchBy }) {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="mt-20 w-full">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {nfts.map((nft, index) => (
          <div
            key={index}
            className="mb-10 p-2 rounded-lg shadow-[0_12px_40px_0px_rgba(0,0,0,0.06)] text-gray-500 border-gray-100 dark:border-gray-900 border-0 border-separate [border-spacing:0_0.5rem] hover:shadow-[0_12px_40px_0px_rgba(0,0,0,0.18)] dark:bg-zinc-800 dark:text-gray-100"
          >
            <Image
              alt="nft image"
              src={nft.image}
              className="object-center object-cover rounded-lg"
            />
            <p className="font-semibold text-gray-700 dark:text-gray-300 mt-2">
              {nft.name}
            </p>
            <p className="mt-1 dark:text-gray-400">{nft.description}</p>
            {searchBy === "creator" && (
              <div className="mt-4">
                <span className="mr-2 dark:text-gray-300">owner</span>
                <a
                  href={`${process.env.NEXT_PUBLIC_SOLSCAN_ACCOUNT}/${nft.owner.address}`}
                  target="_blank"
                  rel="noreferrer"
                  title="Owner Address"
                  className="bg-gray-100 p-1 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                >
                  {nft.owner.address.substr(0, 4)}...
                  {nft.owner.address.slice(-4)}
                </a>
              </div>
            )}
          </div>
        ))}
      </Masonry>
    </div>
  );
}
