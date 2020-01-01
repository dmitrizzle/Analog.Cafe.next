import React from "react";

import { API } from "../constants/router/defaults";
import { fetchArticlePage } from "../core/store/actions-article";
import { responseCache } from "../utils/storage/ls-cache";
import ArticleBlock from "../core/components/pages/Article/components/ArticleBlock";
import Error from "./_error";

const Article = props => {
  if (!props.article) return <Error statusCode={props.error} />;

  // clear cache on refresh
  if (props.isSsr) {
    console.log(`Setting fresh cache for ${props.request.url}`);
    responseCache.set(props.request, props.article);
  }

  return props.article.error ? (
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
    if (article.message === notFound || article.error === notFound) {
      const error = 404;
      if (res) res.statusCode = error;
      return { error };
    }
    if (res) res.statusCode = 500;
    return { error: 500 };
  }

  return { article, user, isSsr: !!req, request };
};

export default Article;
