import React from "react";

import { fetchListPage } from "../core/store/actions-list";
import { fetchListFeatures } from "../core/store/actions-list-features";
import { getListMeta } from "../core/components/pages/List/utils";
import Error from "./_error";
import List from "../core/components/pages/List";
import Main from "../core/components/layouts/Main";
import Features from "../core/components/controls/Features";

const Index = props =>
  props.error ? (
    <Error statusCode={500} />
  ) : (
    <Main>
      <Features />
      <List list={props.list} />
    </Main>
  );

Index.getInitialProps = async ({ reduxStore, pathname, res, query }) => {
  // get page number from get params (for SSR paths)
  const page = query.page || 1;

  // list items
  await reduxStore.dispatch(
    fetchListPage(
      getListMeta(pathname + (query.filter ? query.filter : ""), page).request
    )
  );

  // featured items
  await reduxStore.dispatch(
    fetchListFeatures(
      getListMeta(pathname + (query.filter ? query.filter : "")).request
    )
  );

  const state = reduxStore.getState();
  const { list, listFeatures } = state;

  // 500
  if (list.status === "error" || list.error) {
    if (res) res.statusCode = 500;
    return { error: {} };
  }

  return { list, listFeatures };
};

export default Index;
