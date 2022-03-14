import React from "react";
import Head from "next/head";

import { IHeader } from "../../../interfaces/header.interface";

const Header = (props: IHeader) => {
  const title = props.title || "Bangla OCR";
  return (
    <Head>
      <meta content="text/html" charSet="UTF-8" />
      <title>{title}</title>
    </Head>
  );
};

export default Header;
