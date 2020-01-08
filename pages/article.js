import React from "react";

import { API, DOMAIN } from "../constants/router/defaults";
import { fetchArticlePage } from "../core/store/actions-article";
import { invalidate } from "../utils/server-cache";
import { responseCache } from "../utils/storage/ls-cache";
import ArticleBlock from "../core/components/pages/Article/components/ArticleBlock";
import Error from "./_error";

const Article = props => {
  if (!props.article) return <Error statusCode={props.error} />;

  if (props.isSsr && !props.article.error) {
    // set fresh cache
    responseCache.set(props.request, props.article);
  }

  return prpos.error || props.article.error ? (
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

export default Article;
