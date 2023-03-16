import Layout from "@/components/layout/Layout";
import UserContextProvider from "@/context/UserContext";
import type { AppProps } from "next/app";
import "../style/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContextProvider>
  );
}
