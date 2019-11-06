import { NextSeo } from "next-seo";
import React from "react";

import { MENU_BUTTONS } from "../../core/components/controls/Explore/constants";
import { NAME } from "../../constants/messages/system";
import { iconStyles } from "../../core/components/controls/Explore";
import ArticleSection from "../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import Burger from "../../core/components/icons/Burger";
import ButtonGroupDivider from "../../core/components/controls/Button/components/ButtonGroupDivider";
import CardHeader from "../../core/components/controls/Card/components/CardHeader";
import CardIntegrated from "../../core/components/controls/Card/components/CardIntegrated";
import LinkButton from "../../core/components/controls/Button/components/LinkButton";
import Main from "../../core/components/layouts/Main";

const seo = {
  title: "Explore Analog.Cafe",
  description: "All of the main " + NAME + " website sections are listed here.",
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
            {MENU_BUTTONS({ iconStyles }).map((button, i) => {
              if (button.divider) return <ButtonGroupDivider key={i} />;
              return (
                <LinkButton key={i} {...button}>
                  {button.text}
                </LinkButton>
              );
            })}
          </CardIntegrated>
        </ArticleSection>
      </ArticleWrapper>
    </Main>
  </>
);
