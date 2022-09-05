import { gql } from "@apollo/client";

export const getNftsQuery = gql`
  query GetNfts($auctionHouses: PublicKey!) {
    nfts(
      auctionHouses: [$auctionHouses]
      offset: 0
      limit: 10000
      listed: true
    ) {
      name
      address
      image(width: 1400)
      sellerFeeBasisPoints
      mintAddress
      description
      listings {
        address
        price
        createdAt
        canceledAt
        seller
        tradeState
        metadata
        tradeStateBump
        purchaseReceipt
        tokenSize
        bump
        auctionHouse
      }
      offers {
        address
        tradeState
        price
        buyer
        createdAt
        tradeState
      }
      purchases {
        price
        createdAt
      }
      owner {
        associatedTokenAccountAddress
        address
      }
      creators {
        address
      }
    }
  }
`;

export const getAuctionhouseNftsQuery = gql`
  query GetNfts($creators: [PublicKey!]) {
    nfts(creators: $creators, offset: 0, limit: 10000, listed: true) {
      name
      address
      image(width: 1400)
      sellerFeeBasisPoints
      mintAddress
      description
      activities {
        metadata
        auctionHouse {
          address
        }
        price
        createdAt
        activityType
      }
      listings {
        auctionHouse {
          address
        }
        seller
        metadata
        price
        tokenSize
        tradeState
        tradeStateBump
        createdAt
        canceledAt
      }
      offers {
        tradeState
        price
        buyer
        createdAt
        tradeState
      }
      purchases {
        price
        createdAt
      }
      owner {
        associatedTokenAccountAddress
        address
      }
      creators {
        address
      }
    }
  }
`;

export const getHolaplexNftsQuery = gql`
  query GetNfts($auctionHouses: PublicKey!) {
    nfts(
      auctionHouses: [$auctionHouses]
      offset: 0
      limit: 10000
      listed: true
    ) {
      name
      address
      image(width: 1400)
      sellerFeeBasisPoints
      mintAddress
      description
      listings {
        price
        createdAt
        canceledAt
        seller
        tradeState
        metadata
        tradeStateBump
        tokenSize
        auctionHouse {
          address
        }
      }
      offers {
        tradeState
        price
        buyer
        createdAt
        tradeState
      }
      purchases {
        price
        createdAt
      }
      owner {
        associatedTokenAccountAddress
        address
      }
      creators {
        address
      }
    }
  }
`;

export const getCreatorNftsQuery = gql`
  query GetNft($address: [PublicKey!]) {
    nfts(creators: $address, offset: 0, limit: 100000) {
      name
      address
      image(width: 1400)
      sellerFeeBasisPoints
      mintAddress
      description
      owner {
        address
      }
    }
  }
`;

export const getOwnerNftsQuery = gql`
  query GetNft($address: [PublicKey!]) {
    nfts(owners: $address, offset: 0, limit: 100000) {
      name
      address
      image(width: 1400)
      sellerFeeBasisPoints
      mintAddress
      description
      owner {
        address
      }
    }
  }
`;
