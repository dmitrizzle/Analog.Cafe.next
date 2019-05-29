import React from "react";

import ArticleSection from "../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../core/components/pages/Article/components/ArticleWrapper";
import HeaderLarge from "../core/components/vignettes/HeaderLarge";
import Main from "../core/components/layouts/Main";

const Article = props => {
  return (
    <Main>
      <ArticleWrapper>
        <HeaderLarge pageTitle={"Hi"} pageSubtitle={"Hi"} />
        <ArticleSection>
          <p>Article</p>
        </ArticleSection>
      </ArticleWrapper>
    </Main>
  );
};

Article.getInitialProps = async ({ reduxStore, query }) => {
  // await reduxStore.dispatch(
  //   fetchListPage(getListMeta("/u/" + query.id, 1).request)
  // );
  return {};
};

export default Article;
