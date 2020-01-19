import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";

import { API } from "../../constants/router/defaults";
import { fetchListPage } from "../../core/store/actions-list";
import { getUserInfo } from "../../user/store/actions-user";
import { withRedux } from "../../utils/with-redux";
import ClientLoader from "../../core/components/layouts/Main/components/ClientLoader";
import Error from "../_error";
import List from "../../core/components/pages/List";
import Main from "../../core/components/layouts/Main";

const Bookmarks = props => {
  if (!process.browser) return <ClientLoader />;

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   // fetch user info
  //   if (user.status === "pending") dispatch(getUserInfo());
  // });

  return status !== "ok" ? (
    <Error statusCode={403} />
  ) : (
    <Main>
      <List private bookmarks />
    </Main>
  );
};

export default withRedux(Bookmarks);
