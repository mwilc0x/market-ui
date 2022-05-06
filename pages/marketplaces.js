import Head from "next/head";
import Navbar from "/components/Navbar";
import HolaplexMarketplaces from "/components/marketplaces/HolaplexMarketplaces";

export default function Marketplaces() {
  return (
    <div className="dark:bg-black">
      <Head>
        <title>Provable</title>
        <meta name="description" content="Provable" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-4 w-full xl:w-[1024px] mx-auto">
        <Navbar />
        <HolaplexMarketplaces />
      </div>
    </div>
  );
}
