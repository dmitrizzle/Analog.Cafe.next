import React from "react";

import { topicsModal } from "../../core/components/controls/Topics";
import ArticleSection from "../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import Burger from "../../core/components/icons/Burger";
import CardHeader from "../../core/components/controls/Card/components/CardHeader";
import CardIntegrated from "../../core/components/controls/Card/components/CardIntegrated";
import LinkButton from "../../core/components/controls/Button/components/LinkButton";
import Minimal from "../../core/components/layouts/Minimal";

export default () => (
  <Minimal>
    <ArticleWrapper>
      <ArticleSection>
        <CardIntegrated>
          <CardHeader
            stubborn
            buttons={[0]}
            noStar
            title={
              <span>
                <Burger /> Topics
              </span>
            }
          />
          {topicsModal().buttons.map(button => (
            <LinkButton key={button.to} to={button.to} inverse={button.inverse}>
              {button.text}
            </LinkButton>
          ))}
        </CardIntegrated>
      </ArticleSection>
    </ArticleWrapper>
  </Minimal>
);
