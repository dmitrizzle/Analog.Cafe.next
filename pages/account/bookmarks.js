import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";

import { fetchListPage, initListPage } from "../../core/store/actions-list";
import { getListMeta } from "../../core/components/pages/List/utils";
import { getUserInfo } from "../../user/store/actions-user";
import { withRedux } from "../../utils/with-redux";
import ClientLoader from "../../core/components/layouts/Main/components/ClientLoader";
import Error from "../_error";
import List from "../../core/components/pages/List";
import Main from "../../core/components/layouts/Main";

const Bookmarks = () => {
  const { status } = useSelector(state => state.user);
  const list = useSelector(state => state.list);
  const dispatch = useDispatch();

  useState(() => {
    dispatch(initListPage());
    dispatch(fetchListPage(getListMeta("/account").request, true));
    status === "pending" && dispatch(getUserInfo());
  });

  console.log(status);
  if (status === "pending" || status === "fetching") return <ClientLoader />;

  return status !== "ok" ? (
    <Error statusCode={403} />
  ) : (
    <Main>
      <List private bookmarks list={list} />
    </Main>
  );
};

export default withRedux(Bookmarks);
