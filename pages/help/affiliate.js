import { NextSeo } from "next-seo";
import React from "react";

import { CARD_AFFILIATE } from "../../constants/messages/affiliate";
import { b_mobile } from "../../constants/styles/measurements";
import ArticleSection from "../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import CardCaption from "../../core/components/controls/Card/components/CardCaption";
import CardHeader from "../../core/components/controls/Card/components/CardHeader";
import CardIntegrated from "../../core/components/controls/Card/components/CardIntegrated";
import HeaderLarge from "../../core/components/vignettes/HeaderLarge";
import Main from "../../core/components/layouts/Main";

const AffiliatePage = () => {
  const content = CARD_AFFILIATE;
  return (
    <>
      <NextSeo title={content.info.title} />
      <Main>
        <ArticleWrapper>
          <ArticleSection style={{ maxWidth: b_mobile }}>
            <HeaderLarge pageTitle="Help" />
            <CardIntegrated withOutline>
              <CardHeader
                stubborn
                buttons={[0]}
                nostar
                title={content.info.title}
              />
              <CardCaption>{content.info.text}</CardCaption>
            </CardIntegrated>
          </ArticleSection>
        </ArticleWrapper>
      </Main>
    </>
  );
};
export default AffiliatePage;
