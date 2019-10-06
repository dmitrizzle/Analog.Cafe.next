import React, { useEffect, useState } from "react";
import ClientLoader from "../../core/components/layouts/Main/components/ClientLoader";
import Dashboard from "../../user/components/pages/Account/Dashboard";
import SignIn from "../../user/components/pages/Account/SignIn";
import { NextSeo } from "next-seo";

export const AccountSeo = props => (
  <NextSeo
    title="Your Account"
    description={`Free downloads. Monthly community letters. Exclusive offers and discounts. Promote your website, social, or contact info with a public profile on Analog.Cafe. Submit your work and get featured.`}
  />
);

const Account = () => {
  // only JavaScript-enabled clients can see dashboard
  const [view, setView] = useState("pending");
  useEffect(() => {
    if (typeof localStorage === "undefined" || !localStorage.getItem("token"))
      setView("forbidden");
    if (typeof localStorage !== "undefined" && localStorage.getItem("token"))
      setView("ok");
  }, [view]);

  switch (view) {
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

export default Account;
