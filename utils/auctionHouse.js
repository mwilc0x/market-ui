export function parseOwnerNftListings(listings) {
    listings.map(listing => {
        const {
            auctionHouse,
            price,
            metadataAddress,
            sellerAddress
        } = listing;

        console.log(
            `
            AuctionHouse ${auctionHouse.address.toString()}
            MetaData ${metadataAddress.toString()}
            Price ${price.basisPoints.toNumber()}
            Seller ${sellerAddress.toString()}
            `
        )
    })
}