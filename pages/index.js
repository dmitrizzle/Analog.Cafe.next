import React from "react";

import {
  fetchListFeatures,
  requestFeatured,
} from "../core/store/actions-list-features";
import { fetchListPage } from "../core/store/actions-list";
import { getListMeta } from "../core/components/pages/List/utils";
import { responseCache } from "../utils/storage/ls-cache";
import Error from "./_error";
import Features from "../core/components/controls/Features";
import List from "../core/components/pages/List";
import Main from "../core/components/layouts/Main";

const Index = props => {
  // clear cache on refresh
  if (props.isSsr) {
    props.requests.forEach(request => {
      console.log(`Removing cached response for ${request.url}`);
      responseCache.remove(request);
    });
  }

  return props.error ? (
    <Error statusCode={500} />
  ) : (
    <Main>
      <Features
        listFeatures={props.listFeatures}
        activeCollection={props.query.collection}
        isActiveTag={props.list.filter.tags.length > 0}
      />
      <List list={props.list} listFeatures={props.listFeatures} />
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

  // featured items
  await reduxStore.dispatch(fetchListFeatures(listRequest));

  const state = reduxStore.getState();
  const { list, listFeatures } = state;

  // 500
  if (list.status === "error" || list.error) {
    if (res) res.statusCode = 500;
    return { error: {} };
  }

  return {
    list,
    listFeatures,
    query,
    isSsr: !!req,
    requests: [listRequest, requestFeatured(listRequest)],
  };
};

export default Index;
