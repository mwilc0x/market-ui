import Head from "next/head";
import Link from "next/link";
import Navbar from "/components/Navbar";
import Twitter from "/components/Twitter";

export default function Home() {
  return (
    <div className="dark:bg-black">
      <Head>
        <title>Provable</title>
        <meta name="description" content="Provable" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-4 w-full xl:w-[1024px] mx-auto">
        <Navbar />
        <p>Tools for Solana NFT&apos;s.</p>
        <p className="mt-12">
          <Link href="/creator">
            <a>
              <strong>NFTs by Creator</strong>
            </a>
          </Link>
        </p>
        <p className="mt-6">
          See all NFT&apos;s minted by a given wallet address in listview or
          gridview. Includes options to download a mint list JSON file and a
          more detailed CSV download that includes the current owner address.
        </p>
        <p className="mt-12">
          <Link href="/owner">
            <a>
              <strong>NFTs by Owner</strong>
            </a>
          </Link>
        </p>
        <p className="mt-6">
          Like the above except you can search by owner (wallet address). The
          other options such as JSON and CSV download, listview and grid view
          are the same.
        </p>
        <p className="mt-12">
          <Link href="/mint">
            <a>
              <strong>Mint an NFT</strong>
            </a>
          </Link>
        </p>
        <p className="mt-6">
          Mint a one of one NFT (master edition with a max supply of 0).
        </p>
        <p className="mt-12">
          <Link href="/marketplaces">
            <a>
              <strong>Marketplaces</strong>
            </a>
          </Link>
        </p>
        <p className="mt-6">
          Uses Holaplex&apos;s new GraphQL API to show listings from the six
          currently live Holaplex Marketplace&apos;s.
        </p>
        <p className="mt-12">
          <Link href="/collections">
            <a>
              <strong>Collections</strong>
            </a>
          </Link>
        </p>
        <p className="mt-6">
          Listing from multiple AuctionHouse&apos;s by collection. Includes
          listings from Holaplex, Holaplex Marketplaces, Provable and MagicEden.
          OpenSea hopefully coming soon.
        </p>
        {/* <p className="mt-12">
          <Link href="/listings">
            <a>
              <strong>Listings</strong>
            </a>
          </Link>
        </p>
        <p className="mt-6">All listings from the Provable AuctionHouse.</p> */}
        <p className="mt-12">
          <Link href="/wallet">
            <a>
              <strong>Wallet</strong>
            </a>
          </Link>
        </p>
        <p className="mt-6">View the contents of your wallet.</p>
      </div>
    </div>
  );
}
