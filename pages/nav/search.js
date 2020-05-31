import { NextSeo } from "next-seo";
import React from "react";

import { b_mobile } from "../../constants/styles/measurements";
import { seo } from "../../apps/35mm-film-price-guide/constants";
import ArticleSection from "../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import CardIntegrated from "../../core/components/controls/Card/components/CardIntegrated";
import Footer from "../../core/components/layouts/Main/components/Footer";
import Main from "../../core/components/layouts/Main";
import Menu from "../../core/components/controls/Menu";

export default () => (
  <>
    <NextSeo title={seo.title} description={seo.description} />
    <Main>
      <ArticleWrapper>
        <ArticleSection style={{ maxWidth: b_mobile }}>
          <CardIntegrated withOutline>
            <Menu searchOnly />
          </CardIntegrated>
        </ArticleSection>
      </ArticleWrapper>
      <Footer />
    </Main>
  </>
);
