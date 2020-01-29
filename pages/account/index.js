import { NextSeo } from "next-seo";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import Router from "next/router";

import { getObjectFromUrlParams } from "../../utils/url";
import { getUserInfo } from "../../user/store/actions-user";
import { withRedux } from "../../utils/with-redux";
import ClientLoader from "../../core/components/layouts/Main/components/ClientLoader";
import Dashboard from "../../user/components/pages/Account/Dashboard";
import SignIn from "../../user/components/pages/Account/SignIn";
import ls from "../../utils/storage/ls";

export const AccountSeo = () => (
  <NextSeo
    title="Account"
    description={`Free downloads. Monthly community letters. Exclusive offers and discounts. Promote your website, social, or contact info with a public profile on Analog.Cafe. Submit your work and get featured.`}
    openGraph={{
      type: "website",
      title: "Sign In or Create Account",
    }}
  />
);

const Account = () => {
  const dispatch = useDispatch();
  const { status } = useSelector(state => state.user);

  useEffect(() => {
    const incomingToken = getObjectFromUrlParams(window.location.search)?.token;
    if (incomingToken) {
      ls.setItem("token", incomingToken);
      Router.push("/account");
    }

    const token = ls.getItem("token");
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
      <ClientLoader />
    </>
  );
};

export default withRedux(Account);
