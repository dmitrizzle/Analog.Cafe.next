import { NextSeo } from "next-seo";
import React from "react";

import { NAME } from "../../constants/messages/system";
import { exploreModal } from "../../core/components/controls/Explore";
import ArticleSection from "../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import Burger from "../../core/components/icons/Burger";
import CardHeader from "../../core/components/controls/Card/components/CardHeader";
import CardIntegrated from "../../core/components/controls/Card/components/CardIntegrated";
import LinkButton from "../../core/components/controls/Button/components/LinkButton";
import Main from "../../core/components/layouts/Main";

const seo = {
  title: "Explore",
  description: "Focus explore for " + NAME + ".",
};
export default () => (
  <>
    <NextSeo title={seo.title} description={seo.description} />
    <Main>
      <ArticleWrapper>
        <ArticleSection>
          <CardIntegrated>
            <CardHeader
              stubborn
              buttons={[0]}
              noStar
              title={
                <span>
                  <Burger /> Explore
                </span>
              }
            />
            {exploreModal().buttons.map(button => (
              <LinkButton
                key={button.to}
                to={button.to}
                inverse={button.inverse}
              >
                {button.text}
              </LinkButton>
            ))}
          </CardIntegrated>
        </ArticleSection>
      </ArticleWrapper>
    </Main>
  </>
);
