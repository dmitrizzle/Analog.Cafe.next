import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import Router from "next/router";

import { API } from "../constants/router/defaults";
import { fetchArticlePage } from "../core/store/actions-article";
import { responseCache } from "../utils/storage/ls-cache";
import { withRedux } from "../utils/with-redux";
import ArticleBlock from "../core/components/pages/Article/components/ArticleBlock";
import Error from "./_error";

const Article = ({ article, error, isSsr, request }) => {
  const articleStore = useSelector(state => state.article);
  const articleState = article || articleStore;
  useEffect(() => {}, [articleStore]);

  console.log(
    articleState,
    error,
    isSsr,
    (isSsr && error) || articleState.error
  );

  if (!articleState) {
    Router.router &&
      responseCache.remove({
        url: `${API.ARTICLES}/${Router.router.query.slug}`,
      });
    return <Error statusCode={error} />;
  }

  if (isSsr && !articleState.error) {
    // set fresh cache
    responseCache.set(request, articleState);
  }

  return error ? (
    <Error statusCode={404} />
  ) : (
    <ArticleBlock article={articleState} />
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
