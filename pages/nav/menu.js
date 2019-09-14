import React from "react";

import { MENU_BUTTONS } from "../../core/components/controls/Menu/constants";
import { iconStyles } from "../../core/components/controls/Menu";
import ArticleSection from "../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import Burger from "../../core/components/icons/Burger";
import ButtonGroupDivider from "../../core/components/controls/Button/components/ButtonGroupDivider";
import CardHeader from "../../core/components/controls/Card/components/CardHeader";
import CardIntegrated from "../../core/components/controls/Card/components/CardIntegrated";
import LinkButton from "../../core/components/controls/Button/components/LinkButton";
import Main from "../../core/components/layouts/Main";

export default () => (
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
                <Burger /> Menu
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
);
