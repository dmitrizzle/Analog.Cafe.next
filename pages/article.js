import React from "react";

import { API } from "../constants/router/defaults";
import { ArticleBlock } from "../core/components/pages/Article/components/ArticleBlock";
import { articleInitialState } from "../core/store/reducers-article";
import { fetchArticlePage } from "../core/store/actions-article";
import { userInitialState } from "../user/store/reducers-user";
import Error from "./_error";

const Article = props => {
  if (!props.article) return <Error statusCode={props.error} />;

  console.log(111);

  return props.article.error ? (
    <Error statusCode={404} />
  ) : (
    <ArticleBlock {...props} />
  );
};

Article.getInitialProps = async ({ reduxStore, query, res }) => {
  await reduxStore.dispatch(
    fetchArticlePage({
      url: `${API.ARTICLES}/${query.slug}`,
    })
  );

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

  return { article, user };
};

export default Article;
