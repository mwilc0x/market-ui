import Head from "next/head";
import Navbar from "/components/Navbar";
import FindByCreator from "/components/nfts/FindByCreator";

export default function Creator() {
  return (
    <div className="dark:bg-black">
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
        <meta name="description" content="SolPrint" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-4 w-full xl:w-[1024px] mx-auto">
        <Navbar />
        <FindByCreator />
      </div>
    </div>
  );
}
