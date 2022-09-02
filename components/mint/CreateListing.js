import { useContext, useState } from 'react';
import MetaplexContext from '../../contexts/metaplex';
import { sol } from '@metaplex-foundation/js';

export default function CreateListing({ nftMint }) {
    const [price, setPrice] = useState(0);

    const { mxCtx: { auctionHouse, mx } } = useContext(MetaplexContext);

    const updateListingPrice = (price) => {
        setPrice(price);
    }

    const createListing = async () => {
        const result = await mx
            .auctions()
            .builders()
            .list({
                auctionHouse,
                mintAccount: nftMint.mintAddress,
                price: sol(price)
            });

        console.log('create listing result', result);
    }

    return (
        <div>
            <h1 className="text-2xl">Create Listing</h1>

            <div className="w-full mt-6 relative">
                <label name="nft-listing-price">Price</label>
                <input
                type="number"
                name="nft-listing-price"
                id="nft-listing-price"
                className="w-full rounded-lg px-4 py-2 border border-gray-200 dark:border-gray-600"
                value={price}
                onChange={(e) => updateListingPrice(e.target.value)}
                />
            </div>

            <button className="w-full mt-6 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-300"
                onClick={createListing}
            >List NFT</button>
        </div>
    );
}