import React from "react";

import { API } from "../constants/routes";
import { c_grey_dark } from "../constants/styles/colors";
import { fetchArticlePage } from "../core/store/actions-article";
import { getFirstNameFromFull } from "../utils/author-credits";
import { readingTime } from "../utils/time";
import ArticleFooter from "../core/components/pages/Article/components/ArticleFooter";
import ArticleSection from "../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../core/components/pages/Article/components/ArticleWrapper";
import Error from "./_error";
import HeaderLarge from "../core/components/vignettes/HeaderLarge";
import Link from "../core/components/controls/Link";
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
//

const Article = props => {
  if (!props.article) return <Error statusCode={props.error} />;
  const totalAuthors = props.article.authors.length;
  return (
    <Main>
      <ArticleWrapper>
        <HeaderLarge
          pageTitle={props.article.title}
          pageSubtitle={props.article.subtitle}
        >
          <em
            style={{ paddingTop: "1em", display: "block", color: c_grey_dark }}
          >
            <small>
              {readingTime(props.article.stats)} min read by{" "}
              {props.article.authors.map((author, index) => {
                let connector = ", and ";
                if (totalAuthors === 2) connector = " and ";
                if (totalAuthors > index + 2) connector = ", ";
                if (totalAuthors === 1 || totalAuthors === index + 1)
                  connector = "";
                return (
                  <>
                    <Link to={`/u/${author.id}`}>
                      {getFirstNameFromFull(author.title)}
                    </Link>
                    {connector}
                  </>
                );
              })}
              .
            </small>
          </em>
        </HeaderLarge>
        <ArticleSection>
          <SlateReader value={props.article.content.raw} />
          <ArticleFooter
            article={props.article}
            nextArticle={props.article.next}
            thisArticle={props.article.slug}
            thisArticlePostDate={
              props.article.date && props.article.date.published
            }
            thisArticleEditDate={
              props.article.date && props.article.date.updated
            }
          />
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

  // 404 & 500
  if (article.error) {
    if (article.message === "Article not found") {
      const error = 404;
      if (res) res.statusCode = error;
      return { error };
    }
    if (res) res.statusCode = 500;
    return { error: 500 };
  }

  return { article };
};

export default Article;
