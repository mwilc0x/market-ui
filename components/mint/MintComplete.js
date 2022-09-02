import React from 'react';
import CreateListing from './CreateListing';
import { getTransaction, getAddress } from '../../utils/explorer';
import cx from 'classnames';

function MintDetails({ nftMint }) {
    const txUrl = getTransaction(nftMint?.response?.signature);

    const mintAddress = nftMint?.nft?.address.toString();
    const mintUrl = getAddress(mintAddress);

    const metadataAddress = nftMint?.nft?.metadataAddress.toString();
    const metadataUrl = getAddress(metadataAddress);
    return (
        <div>
            <h1 className="text-2xl mb-5">Mint Details</h1>

            <div className="mb-5">
                <h3 className="text-xl mb-2.5">Transaction</h3>
                <a className="text-blue-400" 
                    href={txUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {nftMint?.response?.signature}
                </a>
            </div>

            <div className="mb-5">
                <h3 className="text-xl mb-2.5">Mint Address</h3>
                <a className="text-blue-400" 
                    href={mintUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {mintAddress}
                </a>
            </div>

            <div className="mb-5">
                <h3 className="text-xl mb-2.5">Metadata Address</h3>
                <a className="text-blue-400" 
                    href={metadataUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {metadataAddress}
                </a>
            </div>

        </div>
    );
}

export default function MintComplete({ nftMint }) {
    const classes = cx(
        'flex-col items-start w-full sm:w-[550px] mx-auto p-2 mt-12 break-all',
        !!nftMint && 'flex',
        !nftMint && 'hidden'
    );

    return (
        <div className={classes}>
            { !!nftMint && <MintDetails nftMint={nftMint} /> }
            { !!nftMint && <CreateListing nftMint={nftMint} /> }
        </div>
  );
}
