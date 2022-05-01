import Head from "next/head";
import FindByCreator from "/components/FindByCreator";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Provable</title>
        <meta name="description" content="Provable" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-4 w-full xl:w-[1024px] mx-auto">
        <nav className="mb-4">
          <h1 className="text-blue-500 text-xl font-bold">provable</h1>
        </nav>
        <FindByCreator />
      </div>
    </div>
  );
}
