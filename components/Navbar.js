import Link from "next/link";
import DarkMode from "/components/DarkMode";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { Jazzicon } from '@ukstv/jazzicon-react';

export default function Navbar() {
  const { publicKey } = useWallet();

  function navToggle() {
    var btn = document.getElementById("menuBtn");
    var nav = document.getElementById("menu");

    btn.classList.toggle("open");
    nav.classList.toggle("flex");
    nav.classList.toggle("hidden");
  }

  let pubKeyStr;
  if (publicKey) {
    pubKeyStr = publicKey && publicKey.toString();
    console.log('NavBar Public Key:', pubKeyStr);
  }

  return (
    <header id="top" className="w-full flex flex-col">
      <nav className="mb-4 flex flex-col lg:flex-row w-full justify-between items-center">
        <div className="w-full lg:w-auto self-start lg:self-center flex flex-row lg:flex-none flex-no-wrap justify-between items-center">
          <h1 className="text-blue-500 hover:text-blue-600 text-xl font-bold inline">
            <Link href="/">
              {process.env.NEXT_PUBLIC_APP_NAME.toLowerCase()}
            </Link>
          </h1>
          <button
            id="menuBtn"
            className="hamburger block lg:hidden focus:outline-none"
            type="button"
            onClick={navToggle}
          >
            <span className="hamburger__top-bun bg-black dark:bg-white"></span>
            <span className="hamburger__bottom-bun bg-black dark:bg-white"></span>
          </button>
        </div>
        <div
          id="menu"
          className="w-full lg:w-auto self-end sm:self-center lg:flex flex-col lg:flex-row items-center h-fit py-1 pb-4 lg:py-0 lg:pb-0 hidden top-[40px] bg-white dark:bg-black"
        >
          {/* <div className="mr-6 mb-6 lg:mb-0 inline">
            <Link href="/creator">
              <a className="text-blue-500 hover:text-blue-600">[Creator]</a>
            </Link>
          </div>
          <div className="mr-6 mb-6 lg:mb-0 inline">
            <Link href="/owner">
              <a className="text-blue-500 hover:text-blue-600">[Owner]</a>
            </Link>
          </div> */}
          <div className="mr-6 mb-6 lg:mb-0 inline">
            <Link href="/mint" className="text-blue-500 hover:text-blue-600">
              [Mint]
            </Link>
          </div>
          <div className="mr-6 mb-6 lg:mb-0 inline">
            <Link
              href="/marketplaces"
              className="text-blue-500 hover:text-blue-600"
            >
              [Marketplaces]
            </Link>
          </div>
          <div className="mr-6 mb-6 lg:mb-0 inline">
            <Link
              href="/collections"
              className="text-blue-500 hover:text-blue-600"
            >
              [Collections]
            </Link>
          </div>
          {/* <div className="mr-6 mb-6 lg:mb-0 inline">
            <Link href="/listings">
              <a className="text-blue-500 hover:text-blue-600">[Listings]</a>
            </Link>
          </div> */}
          <div className="mr-6 mb-6 lg:mb-0 inline">
            <Link href="/wallet" className="text-blue-500 hover:text-blue-600">
              [Wallet]
            </Link>
          </div>
          <DarkMode classname={["mb-6 lg:mb-0 inline"]} />

          <div className="mr-6 mb-6 lg:mb-0 inline wallet-btn">
            <WalletMultiButton />
          </div>

          {pubKeyStr && (
            <div style={{ height: 35, width: 35 }}>
              <Jazzicon address={pubKeyStr} />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
