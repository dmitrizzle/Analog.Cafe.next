import { connect } from "react-redux";
import React from "react";

import { responseCache } from "../../utils/storage/ls-cache";
import ClientLoader from "../../core/components/layouts/Main/components/ClientLoader";
import Error from "../_error";
import List from "../../core/components/pages/List";
import Main from "../../core/components/layouts/Main";

const Bookmarks = props => {
  if (props.isSsr) {
    // flushing is required since we don't know if the user has gone to
    // different pages of the response
    navigator.onLine && responseCache.flush();
  }

  if (!process.browser) return <ClientLoader />;

  const { status } = props.user;

  return (
    <Main>
      {status !== "ok" ? (
        <Error statusCode={403} />
      ) : (
        <List private bookmarks />
      )}
    </Main>
  );
};

Bookmarks.getInitialProps = async ({ req }) => {
  return {
    isSsr: !!req,
  };
};

// client connects to store directly
export default connect(({ user }) => {
  return { user };
}, null)(Bookmarks);
