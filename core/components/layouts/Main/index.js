import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "next/router";
import Head from "next/head";
import React, { useEffect } from "react";
import lscache from "lscache";
import throttle from "lodash.throttle";

import { c_red } from "../../../../constants/styles/themes";
import { hideModal, setModal } from "../../../store/actions-modal";
import { mapPathnameToNavConfig } from "./utils";
import { withRedux } from "../../../../utils/with-redux";
import BreadCrumbs from "../../controls/BreadCrumbs";
import Footer from "./components/Footer";
import Link from "../../controls/Link";
import ModalOverlay from "../../controls/Modal/components/ModalOverlay";

const shouldShowSigninPrompt = () =>
  !lscache.get("token") && !sessionStorage.getItem("dispatched-signin-prompt");

const Main = props => {
  const { router, query, filter, title } = props;
  const dispatch = useDispatch();

  const { status } = useSelector(state => state.user);
  const navConfig = mapPathnameToNavConfig(router?.pathname, status);

  useEffect(() => {
    if (!process.browser) return;
    if (!shouldShowSigninPrompt()) return;

    const dispatchSigninPrompt = throttle(() => {
      if (!shouldShowSigninPrompt()) return;
      if (document.documentElement.scrollTop > 600) {
        dispatch(
          setModal({
            status: "ok",
            info: {
              title: (
                <>
                  <span style={{ color: c_red }}>◉</span> Sign In
                </>
              ),
              text: (
                <p>
                  Get bookmarking, apps, free PDF guides, Community Letters, and{" "}
                  <Link to="/sign-in" onClick={() => dispatch(hideModal())}>
                    more
                  </Link>
                  :
                </p>
              ),
              signin: true,
              noStar: true,
            },
          })
        );
        return sessionStorage.setItem("dispatched-signin-prompt", 1);
      }
    }, 100);

    window.addEventListener("scroll", dispatchSigninPrompt, true);
    return () => {
      window.removeEventListener("scroll", dispatchSigninPrompt, true);
    };
  }, [router.asPath]);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="monetization" content="$ilp.uphold.com/RrGZBrEaBHqE" />
      </Head>

      {!navConfig.isMinimal && (
        <BreadCrumbs query={query} filter={filter} title={title} />
      )}

      <main>{props.children}</main>
      {!navConfig.isMinimal &&
        !router.asPath.includes("/account/submission/") && <Footer />}
      <ModalOverlay />
    </>
  );
};

export default withRouter(withRedux(Main));
