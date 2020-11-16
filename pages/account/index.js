import { NextSeo } from "next-seo";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import Router from "next/router";
import lscache from "lscache";

import { getObjectFromUrlParams } from "../../utils/url";
import { getUserInfo } from "../../user/store/actions-user";
import { makeFroth } from "../../utils/froth";
import { withRedux } from "../../utils/with-redux";
import ClientLoader from "../../core/components/layouts/Main/components/ClientLoader";
import Dashboard from "../../user/components/pages/Account/Dashboard";
import SignIn from "../../user/components/pages/Account/SignIn";

export const AccountSeo = () => (
  <NextSeo
    title="Account"
    description={`Free downloads. Monthly Community Letters. Exclusive offers and discounts. Submit your work and get featured.`}
    openGraph={{
      type: "website",
      title: "Sign In or Create Account",
      images: [
        {
          url: makeFroth({ src: "image-froth_665739_a11kSG1F", size: "m" }).src,
        },
      ],
    }}
  />
);

const Account = () => {
  const dispatch = useDispatch();
  const { status } = useSelector(state => state.user);

  useEffect(() => {
    const incomingToken = getObjectFromUrlParams(window.location.search)?.token;
    if (incomingToken) {
      lscache.set("token", incomingToken);
      setTimeout(() => Router.replace("/account/profile"), 500);
    }

    const token = lscache.get("token");
    status === "pending" && dispatch(getUserInfo(token));
  }, [status]);

  switch (status) {
    case "forbidden":
      return (
        <>
          <AccountSeo />
          <SignIn />
        </>
      );
    case "ok":
      return (
        <>
          <AccountSeo />
          <Dashboard />
        </>
      );
    case "pending":
      return (
        <>
          <AccountSeo />
          <ClientLoader title={"Fetching Your Account Details…"} />
        </>
      );
  }
  return (
    <>
      <AccountSeo />
      <ClientLoader title={"Fetching Your Account Details…"} />
    </>
  );
};

export default withRedux(Account);
