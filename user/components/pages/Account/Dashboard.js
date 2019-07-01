import React from "react";

import ArticleSection from "../../../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../../../core/components/pages/Article/components/ArticleWrapper";
import HeaderLarge from "../../../../core/components/vignettes/HeaderLarge";
import Main from "../../../../core/components/layouts/Main";

export default props => (
  <Main>
    <ArticleWrapper>
      <HeaderLarge pageTitle="Welcome" pageSubtitle="Hi" />
      <ArticleSection>hi</ArticleSection>
    </ArticleWrapper>
  </Main>
);
