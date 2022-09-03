import Head from "next/head";
import Navbar from "/components/Navbar";
import AllAuctionHouses from "/components/marketplaces/AllAuctionHouses";

export default function Collections() {
  return (
    <div className="dark:bg-black">
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
        <meta name="description" content="Provable" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-4 w-full xl:w-[1024px] mx-auto">
        <Navbar />
        <AllAuctionHouses />
      </div>
    </div>
  );
}
