import { withRouter } from "next/router";
import Head from "next/head";
import React from "react";

import { mapPathnameToNavConfig } from "./utils";
import Footer from "./components/Footer";
import ModalOverlay from "../../controls/Modal/components/ModalOverlay";
import Nav from "../../controls/Nav";

const Main = props => {
  const { router } = props;
  const navConfig = mapPathnameToNavConfig(router.pathname);

  console.log("navConfig", navConfig, router.pathname);
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Nav {...navConfig} />
      <main>{props.children}</main>
      {!navConfig.isMinimal && <Footer />}
      <ModalOverlay />
    </>
  );
};

export default withRouter(Main);
