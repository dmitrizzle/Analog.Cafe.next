import { useDispatch } from "react-redux";
import React, { useEffect } from "react";

import { API } from "../constants/router/defaults";
import {
  fetchArticlePage,
  initArticlePage,
} from "../core/store/actions-article";
import { responseCache } from "../utils/storage/ls-cache";
import { withRedux } from "../utils/with-redux";
import ArticleBlock from "../core/components/pages/Article/components/ArticleBlock";
import Error from "./_error";

const Article = props => {
  if (!props.article) return <Error statusCode={props.error} />;

  if (props.isSsr && !props.article.error) {
    // set fresh cache
    responseCache.set(props.request, props.article);
  }

  // populate redux with SSR content
  // const clientArticle = useSelector(state => state.article);
  // const article = clientArticle.status !== "initializing" ? clientArticle : props.article;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initArticlePage(props.article));
  });

  return props.error || props.article.error ? (
    <Error statusCode={404} />
  ) : (
    <ArticleBlock article={props.article} />
  );
};

Article.getInitialProps = async ({ reduxStore, query, res, req }) => {
  const request = { url: `${API.ARTICLES}/${query.slug}` };
  await reduxStore.dispatch(fetchArticlePage(request));

  const article = reduxStore.getState().article;
  const user = reduxStore.getState().user;

  // 404 & 500
  const notFound = "Article not found";
  if (article.error) {
    let error = 500;
    if (article.message === notFound || article.error === notFound) {
      error = 404;
    }
    if (res) res.statusCode = error;
    return { error };
  }

  return { article, user, isSsr: !!req, request };
};

export default withRedux(Article);
