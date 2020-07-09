import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import Router from "next/router";

import {
  addSessionInfo,
  getSessionInfo,
  getUserInfo,
} from "../user/store/actions-user";
import { cleanListPageCaches, responseCache } from "../utils/storage/ls-cache";
import {
  fetchListFeatures,
  requestFeatured,
} from "../core/store/actions-list-features";
import { fetchListPage } from "../core/store/actions-list";
import { getListMeta } from "../core/components/pages/List/utils";
import { getObjectFromUrlParams } from "../utils/url";
import { setModal } from "../core/store/actions-modal";
import { withRedux } from "../utils/with-redux";
import Error from "./_error";
import Features from "../core/components/controls/Features";
import List from "../core/components/pages/List";
import Main from "../core/components/layouts/Main";
import ga from "../utils/data/ga";
import ls from "../utils/storage/ls";

export const awsDownloadLinkpattern = "analog.cafe/downloads/";
const downloadAction = action => ({
  status: "ok",
  info: {
    title: "Your Link is Ready",
    text: "The link you requested is ready! Click the button below to get it.",
    buttons: [
      {
        to: action,
        onClick: () => {
          ga("event", {
            category: "auth",
            action: "account.modal.download",
            label: action,
          });
        },
        text: "Get It",
        branded: true,
      },
    ],
  },
});

const Index = props => {
  const { list, listFeatures, query, isSsr, requests, error } = props;

  const { status, sessionInfo } = useSelector(state => state.user);
  const dispatch = useDispatch();

  if (isSsr) {
    // clear old cache for seen pages beyond 1
    if (requests) cleanListPageCaches(requests.list);

    // refresh cache for list data
    responseCache.set(requests.list, list);
    responseCache.set(requestFeatured, listFeatures);
  }

  useEffect(() => {
    const incomingToken = getObjectFromUrlParams(window.location.search)?.token;
    if (incomingToken) {
      ls.setItem("token", incomingToken);
      Router.push("/");
    }

    const token = ls.getItem("token");
    status === "pending" && dispatch(getUserInfo(token));

    !sessionInfo && dispatch(getSessionInfo());
    const { loginAction } = sessionInfo || {};

    if (loginAction && status === "ok") {
      // take user to download page
      if (loginAction.includes(awsDownloadLinkpattern)) {
        dispatch(setModal(downloadAction(loginAction)));
        dispatch(
          addSessionInfo({
            loginAction: undefined,
          })
        );
        return;
      }

      // redirect user to submission upload page
      if (loginAction.includes("/write/upload")) {
        dispatch(
          addSessionInfo({
            loginAction: undefined,
          })
        );
        Router.push("/write/upload");
        return;
      }

      // redirect user back to the article
      if (loginAction.includes("/r/")) {
        dispatch(
          addSessionInfo({
            loginAction: undefined,
          })
        );
        Router.push(loginAction);
        return;
      }

      // redirect user to bookmarks
      if (loginAction.includes("/account/bookmarks")) {
        dispatch(
          addSessionInfo({
            loginAction: undefined,
          })
        );
        Router.push(loginAction);
        return;
      }
    }
  }, [status]);

  // refresh content after cache has been returned,
  // provided that at least 5 min passed
  useEffect(() => {
    if (list.cached + 5 * 60 < Math.floor(new Date() / 1000)) {
      dispatch(
        fetchListPage({
          ...getListMeta(Router.router.asPath.split("?")[0]).request,
          fresh: true,
        })
      );
      // clear old cache for seen pages beyond 1
      if (requests) cleanListPageCaches(requests.list);
    }
  }, [list]);

  return error ? (
    <Error statusCode={500} />
  ) : (
    <Main query={query} filter={list.filter}>
      <Features
        listFeatures={listFeatures}
        activeCollection={query?.collection}
        isSsr={isSsr}
      />
      <List list={list} listFeatures={listFeatures} />
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
  await reduxStore.dispatch(fetchListFeatures());

  const { list, listFeatures } = reduxStore.getState();

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
    requests: { list: listRequest },
  };
};

export default withRedux(Index);
