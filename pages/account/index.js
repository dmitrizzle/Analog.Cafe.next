import { connect } from "react-redux";
import React, { useEffect, useState } from "react";

import { getUserInfo } from "../../user/store/actions-user";
import Dashboard from "../../user/components/pages/Account/Dashboard";
import SignIn from "../../user/components/pages/Account/SignIn";

const Loader = () => <>Loading...</>;
const Account = () => {
  // only JavaScript-enabled clients can see dashboard
  const [view, setView] = useState("pending");
  useEffect(() => {
    if (typeof localStorage === "undefined" || !localStorage.getItem("token"))
      setView("forbidden");
    if (typeof localStorage !== "undefined" && localStorage.getItem("token"))
      setView("ok");
  });
  switch (view) {
    case "forbidden":
      return <SignIn />;
    case "ok":
      return <Dashboard />;
    case "pending":
      return <Loader />;
  }
  return <Loader />;
};

export default Account;
