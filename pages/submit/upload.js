import React from "react";

import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import HeaderLarge from "../../core/components/vignettes/HeaderLarge";
import Main from "../../core/components/layouts/Main";

export default () => (
  <Main>
    <ArticleWrapper>
      <HeaderLarge pageTitle={"100%"} pageSubtitle="uploading" />
      <p>hello</p>
    </ArticleWrapper>
  </Main>
);
