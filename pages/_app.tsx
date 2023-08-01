import type { AppProps } from "next/app";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import Head from "next/head";

// This is the chainId your dApp will work on.
// const activeChain = "polygon";
//const activeChain = "mumbai";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider 
    activeChain={"polygon"}
    clientId="4353f9fd333d76c2bdff9b0a753a7319"
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;