import { useState } from 'react';
import Head from 'next/head';
import Navbar from '/components/Navbar';
import MintForm from '/components/mint/MintForm';
import MintComplete from '/components/mint/MintComplete';

export default function Mint() {
  const [mintResult, setMintResult] = useState(null);
  return (
    <div className="dark:bg-black">
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
        <meta name="description" content={process.env.NEXT_PUBLIC_APP_NAME} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-4 w-full xl:w-[1024px] mx-auto">
        <Navbar />
        <div className="flex lg:flex-row flex-col-reverse">
          <MintForm mintResult={mintResult} setMintResult={setMintResult} />
          <MintComplete nftMint={mintResult} />
        </div>
      </div>
    </div>
  );
}
