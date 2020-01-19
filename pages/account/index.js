import { NextSeo } from "next-seo";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Router from "next/router";

import { getObjectFromUrlParams } from "../../utils/url";
import { getUserInfo } from "../../user/store/actions-user";
import { withRedux } from "../../utils/with-redux";
import ClientLoader from "../../core/components/layouts/Main/components/ClientLoader";
import Dashboard from "../../user/components/pages/Account/Dashboard";
import SignIn from "../../user/components/pages/Account/SignIn";

export const AccountSeo = () => (
  <NextSeo
    title="Account Dashbaord & Bookmarks"
    description={`Free downloads. Monthly community letters. Exclusive offers and discounts. Promote your website, social, or contact info with a public profile on Analog.Cafe. Submit your work and get featured.`}
  />
);

const Account = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    const incomingToken = getObjectFromUrlParams(window.location.search)?.token;
    if (incomingToken) {
      localStorage.setItem("token", incomingToken);
      Router.push("/account");
    }

    const token = localStorage.getItem("token");
    dispatch(getUserInfo(token));
  }, [user.status]);

  switch (user.status) {
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
