import { connect } from "react-redux";
import React from "react";

import Error from "../_error";
import List from "../../core/components/pages/List";
import Main from "../../core/components/layouts/Main";
import ClientLoader from "../../core/components/layouts/Main/components/ClientLoader";

const Submissions = props => {
  if (!process.browser) return <ClientLoader />;

  const { status } = props.user;

  return (
    <Main>
      {status !== "ok" ? <Error statusCode={403} /> : <List private={true} />}
    </Main>
  );
};

// client connects to store directly
export default connect(({ user }) => {
  return { user };
}, null)(Submissions);
