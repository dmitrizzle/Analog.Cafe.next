import { useSelector } from "react-redux";
import React from "react";

import { withRedux } from "../../utils/with-redux";
import ClientLoader from "../../core/components/layouts/Main/components/ClientLoader";
import Error from "../_error";
import List from "../../core/components/pages/List";
import Main from "../../core/components/layouts/Main";

const Bookmarks = props => {
  if (!process.browser) return <ClientLoader />;
  const { status } = useSelector(state => state.user);

  return status !== "ok" ? (
    <Error statusCode={403} />
  ) : (
    <Main>
      <List private bookmarks />
    </Main>
  );
};

export default withRedux(Bookmarks);
