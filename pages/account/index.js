import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ClientLoader from "../../core/components/layouts/Main/components/ClientLoader";
import Dashboard from "../../user/components/pages/Account/Dashboard";
import SignIn from "../../user/components/pages/Account/SignIn";

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
      return <ClientLoader title={"Fetching Your Account Details…"} />;
  }
  return <ClientLoader />;
};

export default Account;
