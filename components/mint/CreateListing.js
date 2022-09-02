import { useContext, useState } from 'react';
import MetaplexContext from '../../contexts/metaplex';
import { getTransaction, getAddress } from '../../utils/explorer';
import { sol, TransactionBuilder } from '@metaplex-foundation/js';

export default function CreateListing({ nftMint }) {
    const [price, setPrice] = useState(0);
    const [listingResult, setListing] = useState(false);
    const [listingTxnUrl, setListingTxnUrl] = useState('');

    const { mxCtx: { auctionHouse, mx } } = useContext(MetaplexContext);

    const updateListingPrice = (price) => {
        setPrice(price);
    }

    const createListing = async () => {
        const instruction = await mx
            .auctions()
            .builders()
            .list({
                auctionHouse,
                mintAccount: nftMint.mintAddress,
                price: sol(price)
            });
        
        const tx = TransactionBuilder.make().add(instruction);
        const result = await mx.rpc().sendAndConfirmTransaction(tx);
        setListing(result);

        const txnUrl = getTransaction(result.signature);
        setListingTxnUrl(txnUrl);
    }

    return (
        <div className="w-full">
            <h1 className="text-2xl">Create Listing</h1>

            <div className="w-full mt-6 relative">
                <label name="nft-listing-price">Price</label>
                <input
                type="number"
                name="nft-listing-price"
                id="nft-listing-price"
                className="w-full rounded-lg px-4 py-2 border border-gray-200 dark:border-gray-600"
                value={price}
                disabled={!!listingResult}
                onChange={(e) => updateListingPrice(e.target.value)}
                />
            </div>

            <button className="w-full mt-6 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-300"
                onClick={createListing}
                disabled={!!listingResult}
            >List NFT</button>

            { listingResult && (
                <div className="mt-6">
                    <button className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-300"
                        onClick={() => {}}
                    >
                        View Listing
                    </button>
                    
                    <div className="mt-6">
                        <h3 className="text-xl mb-2.5">Listing Transaction</h3>
                        <a className="text-blue-400" 
                            href={listingTxnUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {listingResult?.signature}
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}