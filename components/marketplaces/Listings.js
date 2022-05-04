import Link from "next/link";
import Masonry from "react-masonry-css";
import { roundToTwo } from "/utils/roundToTwo";

export default function Listings({ nfts, subdomain }) {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const res = nfts.filter((a) => a.listings.length > 0);
  const results = [...new Map(res.map((v) => [v.address, v])).values()];

  function marketplaceLink(mint) {
    let link = `https://${subdomain}.holaplex.market/nfts/${mint}`;
    return link;
  }

  return (
    <div>
      <h1 className="text-lg font-bold text-gray-600 mb-4 dark:text-gray-200">
        {results.length} Listings
      </h1>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {results.map((nft, index) => (
          <Link href={marketplaceLink(nft.address)} key={index}>
            <a target="_blank">
              <div
                key={index}
                className="relative mb-10 p-2 rounded-lg shadow-[0_12px_40px_0px_rgba(0,0,0,0.06)] text-gray-500 border-gray-100 dark:border-gray-900 border-0 border-separate [border-spacing:0_0.5rem] hover:shadow-[0_12px_40px_0px_rgba(0,0,0,0.18)] dark:bg-zinc-800 dark:text-gray-100"
              >
                {console.log(nft)}
                <img
                  src={nft.image}
                  className="object-center object-cover rounded-lg"
                />
                <p className="font-semibold text-gray-700 dark:text-gray-300 mt-2">
                  {nft.name}
                </p>
                {/* <p className="mt-1 dark:text-gray-400">{nft.description}</p> */}
                <div className="rounded-[100px] backdrop-blur-lg bg-white/60 px-4 py-2 font-semibold cursor-pointer absolute top-3 left-3 hover:scale-105 text-black">
                  ◎ {roundToTwo(nft.listings[0].price / 1000000000)}
                </div>
              </div>
            </a>
          </Link>
        ))}
      </Masonry>
    </div>
  );
}
