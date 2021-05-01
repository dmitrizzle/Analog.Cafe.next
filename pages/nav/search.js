import { NextSeo } from "next-seo";
import React from "react";

import { b_mobile } from "../../constants/styles/measurements";
import { seo } from "../../apps/average-film-prices/constants";
import ArticleSection from "../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import CardIntegrated from "../../core/components/controls/Card/components/CardIntegrated";
import Footer from "../../core/components/layouts/Main/components/Footer";
import Main from "../../core/components/layouts/Main";
import Menu from "../../core/components/controls/Menu";

const Search = () => (
  <>
    <NextSeo title={seo.title} description={seo.description} />
    <Main>
      <ArticleWrapper>
        <ArticleSection style={{ maxWidth: b_mobile, padding: 0 }}>
          <CardIntegrated withOutline>
            <Menu searchOnly />
          </CardIntegrated>
        </ArticleSection>
      </ArticleWrapper>
      <Footer />
    </Main>
  </>
);

export default Search;
