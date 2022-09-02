import React, { useContext, useState, useEffect } from "react";
import MetaplexContext from '../../contexts/metaplex';
import { Grid } from "react-loader-spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useWallet } from "@solana/wallet-adapter-react";
import FileUpload from './FileUpload';
import MintCompletion from './MintCompletion';
import { bundlrStorage, walletAdapterIdentity } from '@metaplex-foundation/js';
import { asSigner } from '../../utils/wallet';

const StepButton = ({ 
  mintSteps,
  disabled,
  loading,
  mintResult,
  handleCreateNft,
  handleMetadataUpload,
}) => {
  const handleClick = () => {
    if (currentStep == 0) {
      handleMetadataUpload();
    } else {
      handleCreateNft();
    }
  }

  const { currentStep, steps } = mintSteps;

  return (
    <button
      className="w-full mt-6 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-300"
      disabled={disabled || !!mintResult}
      onClick={handleClick}
    >
      {loading ? (
        <div className="w-[17px] mx-auto">
          <Grid color="#3B82F6" height={17} width={17} />
        </div>
      ) : (
        <span>{steps[currentStep]}</span>
      )}
    </button>
  );
}

export default function MintForm({ mintResult, setMintResult }) {
  const [mintSteps, updateMintSteps] = useState({ 
    currentStep: 0,
    steps: {
      0: 'Upload Metadata',
      1: 'Create NFT'
    }
  });
  const wallet = useWallet();
  const [file, setFile] = useState(null);
  const [symbol, setSymbol] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [sellerFee, setSellerFee] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [uploadedMetadata, setUploadedMetadata] = useState(null);

  const { mxCtx } = useContext(MetaplexContext);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!file || !name || !wallet.wallet || !description) {
      setDisabled(true);
    } else {
      if (disabled) {
        setDisabled(false);
      }
    }
  }, [loading, disabled, file, name, description, wallet]);

  const updateSymbol = (symbol) => {
    setSymbol(symbol);
  };

  const updateName = (name) => {
    setName(name);
  };

  const updateDescription = (description) => {
    setDescription(description);
  };

  const updateSellerFee = (sellerFee) => {
    setSellerFee(sellerFee);
  };

  const handleMintAnotherNft = () => {
    setMintResult(null);
    setFile(null);
    setSymbol('');
    setName('');
    setDescription('');
    setSellerFee(0);
    setUploadedMetadata({});
    setDisabled(false); 
  }

  const handleCreateNft = async () => {
    try {
      setDisabled(true);
      setLoading(true);
      updateMintSteps(prevState => {
        return {...prevState, currentStep: 0 };
      });

      const signer = asSigner(wallet);
  
      const { mx } = mxCtx;
      const nftMintResult = await mx
        .use(walletAdapterIdentity(wallet))
        .nfts()
        .create({
          uri: uploadedMetadata.uri,
          name: name,
          sellerFeeBasisPoints: sellerFee,
          symbol: symbol,
          payer: signer,
          owner: signer.publicKey,
          updateAuthority: signer,
        })
        .run();
      
      console.log('Nft mint complete', nftMintResult);
      setMintResult(nftMintResult);
      setLoading(false);
    } catch (e) {
      console.log('Error creating NFT', e);
    }
  }

  const handleMetadataUpload = async () => {
    try {
      setDisabled(true);
      setLoading(true);
      updateMintSteps(prevState => {
        return {...prevState, currentStep: 1 };
      });
  
      const { mx } = mxCtx;
      const uploadResult = await mx
        .use(
          bundlrStorage({
            address: process.env.NEXT_PUBLIC_BUNDLR_DEVNET,
            providerUrl: process.env.NEXT_PUBLIC_SOLANA_API_DEVNET,
            timeout: 60000,
          })
        )
        .nfts()
        .uploadMetadata({
          name, 
          description,
          image: file.href
        })
        .run();
    
      console.log(uploadResult);
      setUploadedMetadata(uploadResult);
      setDisabled(false);
      setLoading(false);
    } catch (e) {
      console.log('Error handling metadata upload', e);
    }
  };

  return (
    <div className="flex flex-col justify-center w-full sm:w-[550px] mx-auto p-2 mt-12">
      
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
      <p className="text-2xl dark:text-white">Mint an NFT on Solana.</p>
      <br />
      <p className="text-lg dark:text-white">1. Upload metadata (image uri, name, description)</p>
      <p className="text-lg dark:text-white">2. Create the NFT mint</p>
      <div className="mt-6 relative">
        <FileUpload 
          file={file}
          setFile={setFile}
          uploadedMetadata={uploadedMetadata}
        />
      </div>
      <MintCompletion mintResult={mintResult} />
      <div className="w-full mt-6 relative">
        <label name="nft-symbol">Symbol</label>
        <input
          type="text"
          name="nft-symbol"
          id="nft-symbol"
          className="w-full rounded-lg px-4 py-2 border border-gray-200 dark:border-gray-600"
          placeholder="* Required"
          value={symbol}
          disabled={!!mintResult}
          onChange={(e) => updateSymbol(e.target.value)}
        />
      </div>
      <div className="w-full mt-6 relative">
        <label name="nft-name">Name</label>
        <input
          type="text"
          name="nft-name"
          id="nft-name"
          className="w-full rounded-lg px-4 py-2 border border-gray-200 dark:border-gray-600"
          placeholder="* Required"
          value={name}
          disabled={!!mintResult}
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
          placeholder="* Required"
          value={description}
          disabled={!!mintResult}
          onChange={(e) => updateDescription(e.target.value)}
        />
      </div>
      <div className="w-full mt-6 relative">
        <label name="nft-seller-fee">Seller Fee (ex. 1000 = 10%)</label>
        <input
          type="number"
          name="nft-seller-fee"
          id="nft-seller-fee"
          className="w-full rounded-lg px-4 py-2 border border-gray-200 dark:border-gray-600"
          value={sellerFee}
          disabled={!!mintResult}
          onChange={(e) => updateSellerFee(e.target.value)}
        />
      </div>
      <StepButton
        disabled={disabled}
        loading={loading}
        mintSteps={mintSteps}
        mintResult={mintResult}
        handleCreateNft={handleCreateNft}
        handleMetadataUpload={handleMetadataUpload}
      />

      { !!mintResult ? (
          <button
            className="w-full mt-6 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-300"
            onClick={handleMintAnotherNft}
          >
            <span>Mint Another NFT</span>
          </button>
        ) : null 
      }
    </div>
  );
}
