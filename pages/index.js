import React from "react";
import Router from "next/router";

import { fetchListFeatures } from "../core/store/actions-list-features";
import { fetchListPage } from "../core/store/actions-list";
import { getListMeta } from "../core/components/pages/List/utils";
import Error from "./_error";
import Features from "../core/components/controls/Features";
import List from "../core/components/pages/List";
import Main from "../core/components/layouts/Main";

const Index = props =>
  props.error ? (
    <Error statusCode={500} />
  ) : (
    <Main>
      <Features
        listFeatures={props.listFeatures}
        activeCollection={props.query.collection}
      />
      <List list={props.list} />
    </Main>
  );

Index.getInitialProps = async ({ reduxStore, pathname, res, query }) => {
  // get page number from get params (for SSR paths)
  const page = query.page || 1;

  const fullPath =
    pathname +
    (query.filter ? query.filter + "/" : "") +
    (query.collection ? query.collection : "");

  // list items
  await reduxStore.dispatch(fetchListPage(getListMeta(fullPath, page).request));

  // featured items
  await reduxStore.dispatch(fetchListFeatures(getListMeta(fullPath).request));

  const state = reduxStore.getState();
  const { list, listFeatures } = state;

  // 500
  if (list.status === "error" || list.error) {
    if (res) res.statusCode = 500;
    return { error: {} };
  }

  console.log("list", list);

  return { list, listFeatures, query };
};

export default Index;
