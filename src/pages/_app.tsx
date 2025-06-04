import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from 'next-i18next';
import TopHeader from "@/components/TopHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";
import Meta from "@/components/Meta";
function App({ Component, pageProps }: AppProps) {
  const { isNewsEnabled = false } = pageProps;

  return (
    <>
      <Head>
        <title>Tech Company Website Template</title>
        <meta name="description" content="A Tech Company Website Template with Next.js, Tailwind CSS, and Plasmic CMS." />
      </Head>
      <TopHeader />
      <Navbar isNewsEnabled={isNewsEnabled}/>
      <Meta />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}

export default appWithTranslation(App);
