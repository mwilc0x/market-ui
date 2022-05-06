import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { WalletContextProvider } from "/contexts/wallet";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider enableSystem={true} attribute="class">
        <WalletContextProvider>
          <Component {...pageProps} />
        </WalletContextProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
