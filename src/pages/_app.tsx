import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from 'next-i18next';
import TopHeader from "@/components/TopHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function App({ Component, pageProps }: AppProps) {
  const { isNewsEnabled = false } = pageProps;

  return (
    <>
      <TopHeader />
      <Navbar isNewsEnabled={isNewsEnabled}/>
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}

export default appWithTranslation(App);
