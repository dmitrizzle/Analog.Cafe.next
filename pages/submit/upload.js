import React from "react";

import ArticleSection from "../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import HeaderLarge from "../../core/components/vignettes/HeaderLarge";
import Main from "../../core/components/layouts/Main";

export default () => (
  <Main>
    <ArticleWrapper>
      <HeaderLarge pageTitle={"100%"} pageSubtitle="uploading" />
      <ArticleSection>
        <p>
          Please <strong>do not</strong> close this window, or press your
          browser’s back button.
        </p>
      </ArticleSection>
    </ArticleWrapper>
  </Main>
);
