import ErrorPage from "next/error";
import React from "react";

import { API } from "../constants/routes";
import { fetchArticlePage } from "../core/store/actions-article";
import ArticleSection from "../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../core/components/pages/Article/components/ArticleWrapper";
import HeaderLarge from "../core/components/vignettes/HeaderLarge";
import Main from "../core/components/layouts/Main";
import SlateReader from "../core/components/controls/SlateReader";
//
// export const getSubmissionOrArticleRoute = locationPathname => {
//   return {
//     pathname: locationPathname.includes("/submissions") ? "/submissions" : "/r",
//     apiRoute: locationPathname.includes("/submissions")
//       ? API.SUBMISSIONS
//       : API.ARTICLES,
//   };
// };

const Article = props => {
  if (!props.article) return <ErrorPage statusCode={props.error} />;
  return (
    <Main>
      <ArticleWrapper>
        <HeaderLarge
          pageTitle={props.article.title}
          pageSubtitle={props.article.subtitle}
        />
        <ArticleSection>
          <SlateReader value={props.article.content.raw} />
        </ArticleSection>
      </ArticleWrapper>
    </Main>
  );
};

Article.getInitialProps = async ({ reduxStore, query, res }) => {
  await reduxStore.dispatch(
    fetchArticlePage({
      url: `${API.ARTICLES}/${query.slug}`,
    })
  );

  const article = reduxStore.getState().article;
  console.log({ article });
  if (article.error || article.message === "Article not found") {
    const error = 404;
    if (res) res.statusCode = error;
    return { error };
  }
  return { article };
};

export default Article;
