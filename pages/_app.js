import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { WalletContextProvider } from "/contexts/wallet";
import { MetaplexProvider } from "/contexts/metaplex";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://graph.holaplex.com/v1",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider enableSystem={true} attribute="class">
        <WalletContextProvider>
          <MetaplexProvider>
            <Component {...pageProps} />
          </MetaplexProvider>
        </WalletContextProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
