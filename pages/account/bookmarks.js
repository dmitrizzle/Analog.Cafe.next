import { NextSeo } from "next-seo";
import React from "react";

import { b_mobile } from "../../constants/styles/measurements";
import ArticleSection from "../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import Bookmarks from "../../core/components/controls/Bookmarks";
import CardIntegrated from "../../core/components/controls/Card/components/CardIntegrated";
import Footer from "../../core/components/layouts/Main/components/Footer";
import HeaderLarge from "../../core/components/vignettes/HeaderLarge";
import Main from "../../core/components/layouts/Main";

const BookmarksPage = () => (
  <>
    <NextSeo title="Bookmarks" />
    <Main>
      <ArticleWrapper>
        <HeaderLarge pageTitle={`Bookmarks`} />
        <ArticleSection style={{ maxWidth: b_mobile, padding: 0 }}>
          <CardIntegrated withOutline>
            <Bookmarks />
          </CardIntegrated>
        </ArticleSection>
      </ArticleWrapper>
      <Footer />
    </Main>
  </>
);

export default BookmarksPage;
