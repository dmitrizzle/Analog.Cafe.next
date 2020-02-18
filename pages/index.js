import React from "react";

import { cleanListPageCaches, responseCache } from "../utils/storage/ls-cache";
import {
  fetchListFeatures,
  requestFeatured,
} from "../core/store/actions-list-features";
import { fetchListPage } from "../core/store/actions-list";
import { getListMeta } from "../core/components/pages/List/utils";
import { withRedux } from "../utils/with-redux";
import Error from "./_error";
import List from "../core/components/pages/List";
import Main from "../core/components/layouts/Main";

const Index = props => {
  const { list, query, isSsr } = props;
  if (isSsr) {
    // clear old cache for seen pages beyond 1
    if (props.requests) cleanListPageCaches(props.requests.list);

    // refresh cache for list data
    responseCache.set(props.requests.list, list);
  }

  return props.error ? (
    <Error statusCode={500} />
  ) : (
    <Main>
      <List list={list} />
    </Main>
  );
};

Index.getInitialProps = async ({ reduxStore, pathname, res, query, req }) => {
  // get page number from get params (for SSR paths)
  const page = query.page || 1;

  const fullPath =
    pathname +
    (query.filter ? query.filter + "/" : "") +
    (query.collection ? query.collection : "");

  const listRequest = getListMeta(fullPath, page).request;

  // list items
  await reduxStore.dispatch(fetchListPage(listRequest));

  const { list } = reduxStore.getState();

  // 500
  if (list.status === "error" || list.error) {
    if (res) res.statusCode = 500;
    return { error: {} };
  }

  return {
    list,
    query,
    isSsr: !!req,
    requests: { list: listRequest },
  };
};

export default withRedux(Index);
