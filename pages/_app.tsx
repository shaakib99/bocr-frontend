import "../styles/globals.css";
import type { AppProps } from "next/app";

require("../styles/custom-antd.less");

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
