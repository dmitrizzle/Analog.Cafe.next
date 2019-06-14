import Head from "next/head";
import React from "react";

import { NAME } from "../../../../constants/messages/app";
import Footer from "./components/Footer";
import Nav from "../../controls/Nav";

const Main = props => (
  <>
    <Head>
      <title>{NAME}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Nav showBrandName={props.showBrandName} tallMargin={props.tallMargin} />
    <main>{props.children}</main>
    <Footer />
  </>
);

export default Main;
