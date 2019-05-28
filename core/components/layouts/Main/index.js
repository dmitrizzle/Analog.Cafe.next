import Head from "next/head";
import React from "react";

import { NAME } from "../../../../constants/messages/app";
import Nav from "../../controls/Nav";

const Main = props => (
  <>
    <Head>
      <title>{NAME}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Nav showBrandName={props.showBrandName} />
    <main>{props.children}</main>
  </>
);

export default Main;
