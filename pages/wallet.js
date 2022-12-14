import Head from "next/head";
import Navbar from "/components/Navbar";
import ConnectedWallet from "/components/wallet/ConnectedWallet";
import { useWallet } from "@solana/wallet-adapter-react";

export default function Wallet() {
  const { publicKey } = useWallet();

  return (
    <div className="dark:bg-black">
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
        <meta name="description" content={process.env.NEXT_PUBLIC_APP_NAME} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-4 w-full xl:w-[1024px] mx-auto">
        <Navbar />
        <div className="mt-10 pt-6 border-t-2 border-gray-100 dark:border-gray-700">
          <h1 className="text-lg font-bold text-gray-600 mb-4 dark:text-gray-200 float-left w-fit">
            {publicKey ? "Your Wallet" : "Connect Your Wallet"}
          </h1>
          <div className="clear-both">{publicKey && <ConnectedWallet />}</div>
        </div>
      </div>
    </div>
  );
}
