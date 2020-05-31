import { NextSeo } from "next-seo";
import React from "react";

import { b_mobile } from "../../constants/styles/measurements";
import { seo } from "../../apps/35mm-film-price-guide/constants";
import ArticleSection from "../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import CardHeader from "../../core/components/controls/Card/components/CardHeader";
import CardIntegrated from "../../core/components/controls/Card/components/CardIntegrated";
import Main from "../../core/components/layouts/Main";
import Search from "../../core/components/icons/Search";
import SearchButtonIcon from "../../core/components/controls/Menu/components/SearchButtonIcon";

export default () => (
  <>
    <NextSeo title={seo.title} description={seo.description} />
    <Main>
      <ArticleWrapper>
        <ArticleSection style={{ maxWidth: b_mobile }}>
          <CardIntegrated withOutline>
            <CardHeader
              stubborn
              buttons={[0]}
              noStar
              title={
                <>
                  <SearchButtonIcon>
                    <Search />
                  </SearchButtonIcon>{" "}
                  Search Analog.Cafe
                </>
              }
            />
          </CardIntegrated>
        </ArticleSection>
      </ArticleWrapper>
    </Main>
  </>
);
