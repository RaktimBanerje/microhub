import "@styles/globals.scss";
import type { AppProps } from "next/app";
import NProgress from "nprogress";
import Router from "next/router";
import Head from 'next/head'
import Script from 'next/script'

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { SSRProvider } from "react-bootstrap";

config.autoAddCss = false;

import "nprogress/nprogress.css";
import "../styles/nprogress.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <Head>
        <link href="/assets/js/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/css/bootstrap-select.min.css" />
      </Head>
      <Component {...pageProps} />
      <Script src="/assets/js/jquery.min.js" strategy='beforeInteractive' />
      <Script src="/assets/js/bootstrap/js/bootstrap.bundle.min.js" strategy='beforeInteractive' />
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/bootstrap-select.min.js" strategy='beforeInteractive' />
      <Script src="/assets/js/custom.js" strategy="afterInteractive" />
    </SSRProvider>
  );
}

export default MyApp;
