import Masonry from "react-masonry-css";

export default function GridView({ nfts }) {
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
            className="mb-10 p-2 rounded-lg shadow-[0_12px_40px_0px_rgba(0,0,0,0.06)] text-gray-500 border-gray-100 dark:border-gray-900 border-0 border-separate [border-spacing:0_0.5rem] hover:shadow-[0_12px_40px_0px_rgba(0,0,0,0.18)]"
          >
            <img
              src={nft.image}
              className="object-center object-cover rounded-lg"
            />
            <p className="font-semibold text-gray-700">{nft.name}</p>
            <p className="mt-1">{nft.description}</p>
            <div className="mt-4">
              <span className="mr-2">owner</span>
              <a
                href={`https://solscan.io/account/${nft.owner.address}`}
                target="_blank"
                rel="noreferrer"
                title="Owner Address"
                className="bg-gray-100 p-1 hover:bg-gray-200"
              >
                {nft.owner.address.substr(0, 4)}...
                {nft.owner.address.slice(-4)}
              </a>
            </div>
          </div>
        ))}
      </Masonry>
    </div>
  );
}
