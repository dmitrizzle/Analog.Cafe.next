import Head from "next/head";
import React from "react";

const Main = props => (
  <>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <main>{props.children}</main>
  </>
);

export default Main;
