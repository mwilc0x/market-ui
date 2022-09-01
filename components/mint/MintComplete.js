import React from 'react';
import cx from 'classnames';

function getTransaction(signature) {
    return `https://explorer.solana.com/tx/${signature}?cluster=devnet`;
}

function getAddress(address) {
    return `https://explorer.solana.com/address/${address}?cluster=devnet`;
}

function MintDetails({ nftMint }) {
    const txUrl = getTransaction(nftMint?.response?.signature);

    const mintAddress = nftMint?.nft?.address.toString();
    const mintUrl = getAddress(mintAddress);

    const metadataAddress = nftMint?.nft?.metadataAddress.toString();
    const metadataUrl = getAddress(metadataAddress);
    return (
        <>
            <h1 className="text-2xl">Mint Details</h1>
            <br />
            <h3 className="text-xl">Transaction</h3>
            <a 
                className="text-blue-400" 
                href={txUrl}
                target="_blank"
                rel="noopener noreferrer"
            >{nftMint?.response?.signature}</a>
            <br />
            <h3 className="text-xl">Mint Address</h3>
            <a 
                className="text-blue-400" 
                href={mintUrl}
                target="_blank"
                rel="noopener noreferrer"
            >{mintAddress}</a>
            <br />
            <h3 className="text-xl">Metadata Address</h3>
            <a 
                className="text-blue-400" 
                href={metadataUrl}
                target="_blank"
                rel="noopener noreferrer"
            >{metadataAddress}</a>
        </>
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
        </div>
  );
}
