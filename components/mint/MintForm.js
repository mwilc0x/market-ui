import React, { useState, useEffect } from "react";
import { Grid } from "react-loader-spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useWallet } from "@solana/wallet-adapter-react";
import FileUpload from './FileUpload';

export default function MintForm() {
  const { wallet } = useWallet();
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!file || !name || !wallet || !description) {
      setDisabled(true);
    } else {
      if (disabled) {
        setDisabled(false);
      }
    }
  }, [loading, disabled, file, name, description, wallet]);

  const updateName = (name) => {
    setName(name);
  };

  const updateDescription = (description) => {
    setDescription(description);
  };

  const doMint = async () => {
    setDisabled(true);
    setLoading(true);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full sm:w-[550px] mx-auto p-2 mt-12">
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
        <FileUpload setFile={setFile} />
      </div>
      <div className="w-full mt-6 relative">
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
      <div className="w-full mt-6 relative">
        <label name="nft-description">Description</label>
        <input
          type="text"
          name="nft-description"
          id="nft-description"
          className="w-full rounded-lg px-4 py-2 border border-gray-200 dark:border-gray-600"
          placeholder="Required"
          defaultValue={description}
          onChange={(e) => updateDescription(e.target.value)}
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
