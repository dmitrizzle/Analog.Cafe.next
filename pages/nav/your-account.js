import { NextSeo } from "next-seo";
import React from "react";
import { connect } from "react-redux";

import { NAME } from "../../constants/messages/system";
import { accountModal } from "../../core/components/controls/YourAccount";
import ArticleSection from "../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import User from "../../core/components/icons/User";
import CardHeader from "../../core/components/controls/Card/components/CardHeader";
import CardIntegrated from "../../core/components/controls/Card/components/CardIntegrated";
import LinkButton from "../../core/components/controls/Button/components/LinkButton";
import Main from "../../core/components/layouts/Main";

const seo = {
  title: "Explore",
  description: "Focus explore for " + NAME + ".",
};
const YourAccount = props => (
  <>
    <NextSeo title={seo.title} description={seo.description} />
    <Main>
      <ArticleWrapper>
        <ArticleSection>
          <CardIntegrated style={{ maxWidth: 360, margin: "0 auto" }}>
            <CardHeader
              stubborn
              buttons={[0]}
              noStar
              title={
                <>
                  <User style={{ margin: "0 .25em" }} /> Your Account
                </>
              }
            />
            {accountModal(props).buttons.map(
              button =>
                button &&
                button.to && (
                  <LinkButton
                    key={button.to}
                    to={button.to}
                    inverse={button.inverse}
                  >
                    {button.text}
                  </LinkButton>
                )
            )}
          </CardIntegrated>
        </ArticleSection>
      </ArticleWrapper>
    </Main>
  </>
);

export default connect(
  ({ user }) => {
    return { user };
  },
  null
)(YourAccount);
