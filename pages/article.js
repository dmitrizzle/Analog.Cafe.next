import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import Reader from "@roast-cms/french-press-editor/dist/components/vignettes/Reader";

import { API } from "../constants/router/defaults";
import { articleInitialState } from "../core/store/reducers-article";
import { c_grey_dark } from "../constants/styles/colors";
import { fetchArticlePage } from "../core/store/actions-article";
import { readingTime } from "../utils/time";
import { userInitialState } from "../user/store/reducers-user";
import ArticleFooter from "../core/components/pages/Article/components/ArticleFooter";
import ArticleNav from "../core/components/pages/Article/components/ArticleNav";
import ArticleSection from "../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../core/components/pages/Article/components/ArticleWrapper";
import Error from "./_error";
import HeaderLarge from "../core/components/vignettes/HeaderLarge";
import Link from "../core/components/controls/Link";
import Main from "../core/components/layouts/Main";
import Picture from "../core/components/vignettes/Picture";

export const AuthorsPrinted = ({ authors, shouldLink }) => {
  if (!authors) return null;
  const Template = ({ author, connector, shouldLink }) => (
    <span>
      {shouldLink ? (
        <Link to={author.id ? `/u/${author.id}` : `/u/not-listed`}>
          {author.title || author.name}
        </Link>
      ) : (
        author.title || author.name
      )}
      {connector}
    </span>
  );

  // separate lead author
  const leadAuthor = authors.filter(author => author.authorship === "article");
  const imageAuthors = authors.filter(
    author => author.authorship === "photography"
  );
  const sortedAuthors = [...leadAuthor, ...imageAuthors];
  const totalAuthors = sortedAuthors.length;

  return sortedAuthors.map((author, index) => {
    let connector = ", and ";
    if (totalAuthors === 2) connector = " and ";
    if (totalAuthors > index + 2) connector = ", ";
    if (totalAuthors === 1 || totalAuthors === index + 1) connector = "";

    return (
      <Template
        author={author}
        key={author.id || index}
        connector={connector}
        shouldLink={shouldLink}
      />
    );
  });
};

export const Article = props => {
  if (!props.article) return <Error statusCode={props.error} />;

  const [load, pingload] = useState(0);
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.location.pathname.includes("/account/submissions") &&
      typeof localStorage !== "undefined"
    ) {
      props.fetchArticlePage(
        {
          url: `${API.SUBMISSIONS}/${window.location.pathname.replace(
            "/account/submissions/",
            ""
          )}`,
        },
        localStorage.getItem("token")
      );
    }
  }, [load]);

  return props.article.error ? (
    <Error statusCode={404} />
  ) : (
    <Main>
      <ArticleNav
        article={{ id: props.article.id, slug: props.article.slug }}
      />
      <ArticleWrapper>
        <HeaderLarge
          pageTitle={props.article.title}
          pageSubtitle={props.article.subtitle}
        >
          <em style={{ display: "block", color: c_grey_dark }}>
            <small>
              {readingTime(props.article.stats)} min read by{" "}
              <AuthorsPrinted authors={props.article.authors} shouldLink />.
            </small>
          </em>
        </HeaderLarge>
        <ArticleSection>
          <Reader
            value={props.article.content.raw}
            components={{ Picture, Link }}
          />
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
  let requestURL;
  //client
  if (typeof window !== "undefined") requestURL = window.location.pathname;
  // server
  if (typeof res !== "undefined") requestURL = res.req.url;

  // server only displays pending state for all user account urls
  if (requestURL && requestURL.includes("/account"))
    return {
      article: articleInitialState,
      user: userInitialState,
    };

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

// client connects to store directly
const mapDispatchToProps = dispatch => {
  return {
    fetchArticlePage: (request, token) => {
      dispatch(fetchArticlePage(request, token));
    },
  };
};
export default connect(
  ({ user, article }) => {
    return { user, article };
  },
  mapDispatchToProps
)(Article);
