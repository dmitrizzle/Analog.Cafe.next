import React from "react";

import { fetchListFeatures } from "../core/store/actions-list-features";
import { fetchListPage } from "../core/store/actions-list";
import { getListMeta } from "../core/components/pages/List/utils";
import ArticleSection from "../core/components/pages/Article/components/ArticleSection";
import Error from "./_error";
import Features from "../core/components/controls/Features";
import List from "../core/components/pages/List";
import Main from "../core/components/layouts/Main";

const Index = props =>
  props.error ? (
    <Error statusCode={500} />
  ) : (
    <Main>
      <ArticleSection>
        <h3>☞ Features</h3>
      </ArticleSection>
      <Features listFeatures={props.listFeatures} />
      <ArticleSection>
        <h3>☟Fresh</h3>
      </ArticleSection>
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
