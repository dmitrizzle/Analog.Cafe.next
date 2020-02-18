import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import Router from "next/router";

import { cleanListPageCaches, responseCache } from "../utils/storage/ls-cache";
import { fetchListPage } from "../core/store/actions-list";
import { getListMeta } from "../core/components/pages/List/utils";
import { getObjectFromUrlParams } from "../utils/url";
import { getUserInfo } from "../user/store/actions-user";
import { withRedux } from "../utils/with-redux";
import Error from "./_error";
import List from "../core/components/pages/List";
import Main from "../core/components/layouts/Main";
import ls from "../utils/storage/ls";

const Index = props => {
  const { list, isSsr } = props;
  const { status } = useSelector(state => state.user);
  const dispatch = useDispatch();

  if (isSsr) {
    // clear old cache for seen pages beyond 1
    if (props.requests) cleanListPageCaches(props.requests.list);

    // refresh cache for list data
    responseCache.set(props.requests.list, list);
  }

  useEffect(() => {
    const incomingToken = getObjectFromUrlParams(window.location.search)?.token;
    if (incomingToken) {
      ls.setItem("token", incomingToken);
      Router.push("/");
    }

    const token = ls.getItem("token");
    status === "pending" && dispatch(getUserInfo(token));
  }, [status]);

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
