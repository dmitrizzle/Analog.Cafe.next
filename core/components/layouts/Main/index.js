import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "next/router";
import Head from "next/head";
import React, { useEffect } from "react";
import lscache from "lscache";
import throttle from "lodash.throttle";

import { SIGN_IN_MODAL } from "./constants";
import { mapPathnameToNavConfig } from "./utils";
import { setModal } from "../../../store/actions-modal";
import { withRedux } from "../../../../utils/with-redux";
import BreadCrumbs from "../../controls/BreadCrumbs";
import Footer from "./components/Footer";
import ModalOverlay from "../../controls/Modal/components/ModalOverlay";
import ga from "../../../../utils/data/ga";

const Main = props => {
  const { router, query, filter, title } = props;
  const { status } = useSelector(state => state.user);
  const navConfig = mapPathnameToNavConfig(router?.pathname, status);

  //////// below: sign up popup code
  const dispatch = useDispatch();
  const shouldShowSigninPrompt = () =>
    !lscache.get("token") &&
    sessionStorage.getItem("dispatched-signin-prompt") !== router.asPath &&
    router.asPath.startsWith("/r/") &&
    !navConfig.skipAllNavigation;

  useEffect(() => {
    if (!process.browser) return;

    // skip popoup on integration test views
    if (router?.query.cypress_tests === "true") return;

    // check other show/noshow rules
    if (!shouldShowSigninPrompt()) return;

    const dispatchSigninPrompt = throttle(() => {
      // hashes may conflict/confuse users if this popup shows up too
      if (window.location.hash) return;

      // do not show on short windows
      if (document.documentElement.offsetHeight < window.innerHeight * 2)
        return;

      let scrollTrigger =
        document.documentElement.offsetHeight / 1.9 - window.innerHeight * 1.5;
      if (scrollTrigger > window.innerHeight * 5)
        scrollTrigger = window.innerHeight * 5;
      if (scrollTrigger < window.innerHeight)
        scrollTrigger = window.innerHeight / 1.25;

      if (!shouldShowSigninPrompt()) return;
      if (document.documentElement.scrollTop > scrollTrigger) {
        dispatch(setModal(SIGN_IN_MODAL));
        ga("event", {
          category: "nav",
          action: "scroll.modal.signin",
          label: router.asPath,
        });
        return sessionStorage.setItem(
          "dispatched-signin-prompt",
          router.asPath
        );
      }
    }, 100);

    window.requestAnimationFrame(() =>
      window.addEventListener("scroll", dispatchSigninPrompt, true)
    );
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
        !router.asPath.includes("/account/submission/") && (
          <Footer withinArticle={props.withinArticle} />
        )}
      <ModalOverlay />
    </>
  );
};

export default withRouter(withRedux(Main));
