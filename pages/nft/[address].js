import { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '/components/Navbar';
import Image from 'next/image';
import { useRouter } from 'next/router';
import MetaplexContext from '../../contexts/metaplex';
import { PublicKey } from "@solana/web3.js";
import { getAddress, getSellerFeeString } from '../../utils/explorer';

export default function Mint() {
    const [nftDetails, setNftDetails] = useState(null);
    const { loading: mxLoading, mxCtx: { mx } } = useContext(MetaplexContext);
    const router = useRouter();
    const address = router?.query?.address;

    useEffect(() => {
        if (mxLoading === true) {
            return;
        }

        try {
            if (!!address) {
                console.log('get nft details');
                const getNftDetails = async () => {
                    const mintAddress = new PublicKey(address);
    
                    const nftResult = await mx
                        .nfts()
                        .findByMint({ mintAddress })
                        .run();
                    
                    setNftDetails(nftResult);
                }
                
                getNftDetails();
            }
        } catch (e) {
            console.log('Error initializing NFT data', e);
        }
    }, [address, mxLoading]);

    if (!nftDetails) {
        return null;
    } else {
        console.log('NFT details', nftDetails);
    }

    const { 
        address: mintAddress,
        metadataAddress,
        updateAuthorityAddress,
        json: { image, name, description },
        sellerFeeBasisPoints,
        isMutable
    } = nftDetails;

    return (
        <div className="dark:bg-black">
            <Head>
            <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
            <meta name="description" content={process.env.NEXT_PUBLIC_APP_NAME} />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="p-4 w-full xl:w-[1024px] mx-auto">
            <Navbar />
            <div className="flex lg:flex-row flex-col-reverse mt-12">
                <div className="flex flex-col items-center items-start w-full mx-auto p-2 mt-12 break-all">
                    <Image 
                        alt={name} 
                        width={800} 
                        height={800} 
                        src={image}
                    />
                </div>
                <div className="flex-col items-start w-full ml-6 p-2 mt-12 break-all">
                    <div className="mb-10">
                        <p className="text-2xl mb-0.5">{name}</p>
                        <p className="text-xl mb-2.5">{description}</p>
                    </div>

                    <div className="mb-5">
                        <p className="text-xl mb-0.5">Mint Account</p>
                        <a className="text-blue-400" 
                            href={getAddress(mintAddress)}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {mintAddress.toString()}
                        </a>
                    </div>

                    <div className="mb-5">
                        <p className="text-xl mb-0.5">Metadata Account</p>
                        <a className="text-blue-400" 
                            href={getAddress(metadataAddress)}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {metadataAddress.toString()}
                        </a>
                    </div>

                    <div className="mb-5">
                        <p className="text-xl mb-0.5">Update Authority</p>
                        <a className="text-blue-400" 
                            href={getAddress(updateAuthorityAddress)}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {updateAuthorityAddress.toString()}
                        </a>
                    </div>

                    <div className="mb-5">
                        <p className="text-xl mb-0.5">Seller Fee</p>
                        <p className="text-md mb-0.5">{getSellerFeeString(sellerFeeBasisPoints)}</p>
                    </div>

                    <div className="mb-5">
                        <p className="text-xl mb-0.5">Is Mutable</p>
                        <p className="text-md mb-0.5">{`${isMutable}`}</p>
                    </div>

                </div>
            </div>
            </div>
        </div>
    );
}
