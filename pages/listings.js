import Head from "next/head";
import Navbar from "/components/Navbar";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import ListingsContainer from "/components/listings/ListingsContainer";

export default function Listings() {
  return (
    <div className="dark:bg-black">
      <Head>
        <title>Provable</title>
        <meta name="description" content="Provable" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-4 w-full xl:w-[1024px] mx-auto">
        <Navbar />
        <div className="mt-10 pt-6 border-t-2 border-gray-100 dark:border-gray-700">
          <h1 className="text-lg font-bold text-gray-600 mb-4 dark:text-gray-200 float-left w-fit">
            All Provable AuctionHouse Listings.
          </h1>
          <div className="w-fit float-right">
            <WalletMultiButton />
          </div>
          <div className="clear-both">
            <ListingsContainer />
          </div>
        </div>
      </div>
    </div>
  );
}
