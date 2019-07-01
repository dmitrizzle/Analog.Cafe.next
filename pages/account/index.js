import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ClientLoader from "../../core/components/layouts/Main/components/ClientLoader";
import Dashboard from "../../user/components/pages/Account/Dashboard";
import SignIn from "../../user/components/pages/Account/SignIn";

const ClientLoaderWrapper = styled.div`
  header {
    margin: -0.6em auto 0;
    ${props =>
      props.isClient &&
      `
        margin: 1em auto 0;
      `}
  }
`;

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
      return (
        <ClientLoaderWrapper>
          <ClientLoader />
        </ClientLoaderWrapper>
      );
  }
  return (
    <ClientLoaderWrapper>
      <ClientLoader />
    </ClientLoaderWrapper>
  );
};

export default Account;
