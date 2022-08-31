import React, { useState, useEffect } from "react";
import { Grid } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import mintNFT from "/utils/mintNFT";
import { Creator, extendBorsh } from "/utils/metaplex/metadata";
import FileUpload from './FileUpload';

export default function MintForm() {
  const { wallet } = useWallet();
  const [file, setFile] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [royalties, setRoyalties] = useState(0);
  const [externalUrl, setExternalUrl] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const connection = new Connection(process.env.NEXT_PUBLIC_RPC, "confirmed");

  useEffect(() => {
    if (!name || !wallet || !file) setDisabled(true);
    if (name && name.length < 3) setDisabled(true);
    if (name && name.length > 2 && wallet && file) setDisabled(false);
  }, [name, file, wallet]);

  const updateName = (name) => {
    if (name.length < 3) {
      setName();
    } else {
      setName(name);
    }
  };

  const doMint = async () => {
    setDisabled(true);
    setLoading(true);
    extendBorsh();
    const metadata = {
      animation_url: undefined,
      creators: [
        new Creator({
          address: new PublicKey(wallet.adapter.publicKey.toString()),
          verified: true,
          share: 100,
        }),
      ],
      description: description || "",
      external_url: externalUrl || "",
      image: file.name,
      name: name,
      symbol: "",
      sellerFeeBasisPoints: royalties * 100,
      properties: {
        category: "image",
        files: [{ type: file.type, uri: file.name }],
      },
    };
    try {
      await mintNFT(connection, wallet.adapter, [file], metadata);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setDisabled(false);
      setLoading(false);
    }
  };

  return (
    <div className="w-full sm:w-[550px] mx-auto p-2 mt-12">
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <p className="dark:text-white">Mint an NFT on Solana.</p>
      <div className="mt-6 relative">
        <FileUpload />
      </div>
      <div className="mt-6 relative">
        <label name="nft-name">Name</label>
        <input
          type="text"
          name="nft-name"
          id="nft-name"
          className="w-full rounded-lg px-4 py-2 border border-gray-200 dark:border-gray-600"
          placeholder="* Required"
          defaultValue={name}
          onChange={(e) => updateName(e.target.value)}
        />
      </div>
      <div className="mt-6 relative">
        <label name="nft-description">Description</label>
        <input
          type="text"
          name="nft-description"
          id="nft-description"
          className="w-full rounded-lg px-4 py-2 border border-gray-200 dark:border-gray-600"
          placeholder="Optional"
          defaultValue={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mt-6 relative">
        <label name="nft-royalties">Royalties</label>
        <input
          type="number"
          name="nft-royalties"
          id="nft-royalties"
          className="w-full rounded-lg px-4 py-2 border border-gray-200 dark:border-gray-600"
          placeholder="Royalties"
          defaultValue={royalties}
          onChange={(e) => setRoyalties(e.target.value)}
        />
      </div>
      <div className="mt-6 relative">
        <label name="nft-external-url">External URL</label>
        <input
          type="text"
          name="nft-external-url"
          id="nft-external-url"
          className="w-full rounded-lg px-4 py-2 border border-gray-200 dark:border-gray-600"
          placeholder="Optional"
          defaultValue={externalUrl}
          onChange={(e) => setExternalUrl(e.target.value)}
        />
      </div>
      <button
        className="w-full mt-6 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-300"
        disabled={disabled}
        onClick={doMint}
      >
        {loading ? (
          <div className="w-[17px] mx-auto">
            <Grid color="#3B82F6" height={17} width={17} />
          </div>
        ) : (
          <span>Create</span>
        )}
      </button>
    </div>
  );
}
