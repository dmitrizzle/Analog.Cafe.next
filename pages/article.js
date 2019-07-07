import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import Reader from "@roast-cms/french-press-editor/dist/components/vignettes/Reader";

import { API } from "../constants/router/defaults";
import {
  addFavourite,
  deleteFavourite,
  isFavourite,
} from "../user/store/actions-favourites";
import { c_grey_dark } from "../constants/styles/colors";
import { fetchArticlePage } from "../core/store/actions-article";
import { readingTime } from "../utils/time";
import ArticleFooter from "../core/components/pages/Article/components/ArticleFooter";
import ArticleSection from "../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../core/components/pages/Article/components/ArticleWrapper";
import Error from "./_error";
import FavouriteButton from "../core/components/pages/Article/components/FavouriteButton";
import HeaderLarge from "../core/components/vignettes/HeaderLarge";
import Link from "../core/components/controls/Link";
import Main from "../core/components/layouts/Main";
import Picture from "../core/components/vignettes/Picture";

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

const Article = props => {
  if (!props.article) return <Error statusCode={props.error} />;

  // determine favourite status
  const [isFavourite, setFavouriteStatus] = useState(false);
  useEffect(() => {
    console.log(1);
    if (!props.favourites[props.article.id])
      props.isFavourite(props.article.id);
    setFavouriteStatus(
      props.favourites[props.article.id] &&
        props.favourites[props.article.id].user > 0
    );
  }, [props.article.id]);

  // take action on favourite button
  const handleFavourite = event => {
    setFavouriteStatus(!isFavourite);
    isFavourite
      ? props.deleteFavourite(props.article.id)
      : props.addFavourite({
          id: props.article.id,
          slug: props.article.slug,
        });
  };

  return (
    <Main>
      {props.user && props.user.status === "ok" && (
        <FavouriteButton
          isFavourite={isFavourite}
          handleFavourite={handleFavourite}
        />
      )}
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

// redux to be connected on client side for favourites button
const mapStateToProps = ({ user, favourites }) => {
  return { user, favourites };
};
const mapDispatchToProps = dispatch => {
  return {
    isFavourite: article => {
      dispatch(isFavourite(article));
    },
    addFavourite: favourite => {
      dispatch(addFavourite(favourite));
    },
    deleteFavourite: id => {
      dispatch(deleteFavourite(id));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Article);
