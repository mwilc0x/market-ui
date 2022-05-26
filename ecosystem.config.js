module.exports = {
  apps: [
    {
      name: "provable",
      script: "./pages/_app.js",
      instances: 1,
      autorestart: true,
      env: {
        NEXT_PUBLIC_GRAPHQL_ENDPOINT: "https://graph.holaplex.com/v1",
        NEXT_PUBLIC_METAPLEX:
          "https://us-central1-metaplex-studios.cloudfunctions.net/uploadFile",
        NEXT_PUBLIC_RPC: "https://ssc-dao.genesysgo.net/",
        NEXT_PUBLIC_AUCTIONHOUSE:
          "3nAR6ZWZQA1uSNcRy3Qya2ihLU9dhaWKfZavoSiRrXzj",
        NEXT_PUBLIC_AUCTIONHOUSE_AUTHORITY:
          "GQbrgxZsRGm3XrrcD9RrwaYHNaLDgvLm4Q16sH7Ybo7r",
        NEXT_PUBLIC_AUCTIONHOUSE_FEE_ACCOUNT:
          "BumM7hvTGYUvHBSMaDiHqiBPGV8udxhtpZ7CcgFLi2Q8",
        NEXT_PUBLIC_AUCTIONHOUSE_TREASURY_MINT:
          "So11111111111111111111111111111111111111112",
        NEXT_PUBLIC_AUCTIONHOUSE_TREASURY:
          "9rKM3prmcAnjLwwKAp1vHqXds8TRjM9Rz3bqfugkJXRZ",
      },
    },
  ],
};
