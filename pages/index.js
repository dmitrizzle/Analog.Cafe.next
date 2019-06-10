import React from "react";

import { fetchListPage } from "../core/store/actions-list";
import { getListMeta } from "../core/components/pages/List/utils";
import Error from "./_error";
import List from "../core/components/pages/List";
import Main from "../core/components/layouts/Main";

const Index = props =>
  props.error ? (
    <Error statusCode={500} />
  ) : (
    <Main showBrandName>
      <List list={props.list} />
    </Main>
  );

Index.getInitialProps = async ({ reduxStore, pathname, res, query }) => {
  await reduxStore.dispatch(
    fetchListPage(
      getListMeta(pathname + (query.filter ? query.filter : ""), 1).request
    )
  );
  const list = reduxStore.getState().list;

  // 500
  if (list.status === "error" || list.error) {
    if (res) res.statusCode = 500;
    return { error: {} };
  }

  return { list };
};

export default Index;
