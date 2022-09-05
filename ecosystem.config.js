module.exports = {
  apps: [
    {
      name: `${process.env.NEXT_PUBLIC_APP_NAME}`,
      script: "./pages/_app.js",
      instances: 1,
      autorestart: true,
      env: {
        NEXT_PUBLIC_GRAPHQL_ENDPOINT: "https://graph.holaplex.com/v1",
        NEXT_PUBLIC_METAPLEX:
          "https://us-central1-metaplex-studios.cloudfunctions.net/uploadFile",
        NEXT_PUBLIC_RPC: "https://ssc-dao.genesysgo.net/",
        NEXT_PUBLIC_AUCTIONHOUSE:
          "CZ2DQcEGJ8FbcGDCjMizW5L6bdmE6JfSXT7fHpdegRYA",
        NEXT_PUBLIC_AUCTIONHOUSE_AUTHORITY:
          "6yJuMYmHqBg6Qh4iN1fDy6U7ZPXwkqZ5tcWWS8gAAex7",
        NEXT_PUBLIC_AUCTIONHOUSE_FEE_ACCOUNT:
          "B4PejAvqEKYRxkpkWqRqgJeaDswBwazQGnsZoboWCRbz",
        NEXT_PUBLIC_AUCTIONHOUSE_TREASURY_MINT:
          "So11111111111111111111111111111111111111112",
        NEXT_PUBLIC_AUCTIONHOUSE_TREASURY:
          "4ZF4GozkBVJqikguYzrb1sfSYsbt8uks19vekCf6prFG",
      },
    },
  ],
};
