import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";

import { getUserInfo } from "../../user/store/actions-user";
import { initListPage } from "../../core/store/actions-list";
import { withRedux } from "../../utils/with-redux";
import ClientLoader from "../../core/components/layouts/Main/components/ClientLoader";
import Error from "../_error";
import List from "../../core/components/pages/List";
import Main from "../../core/components/layouts/Main";

const Submissions = () => {
  const { status } = useSelector(state => state.user);
  const list = useSelector(state => state.list);
  const dispatch = useDispatch();

  list.status === "initializing" && dispatch(initListPage());
  useState(() => {
    status === "pending" && dispatch(getUserInfo());
  });

  if (!process.browser || list.status === "initializing")
    return <ClientLoader />;

  return status !== "ok" && status !== "pending" ? (
    <Error statusCode={403} />
  ) : (
    <Main>
      <List private={true} />
    </Main>
  );
};

// client connects to store directly
export default withRedux(Submissions);
