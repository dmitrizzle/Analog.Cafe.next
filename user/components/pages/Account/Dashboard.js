import React from "react";

import { withRedux } from "../../../../utils/with-redux";
import ArticleSection from "../../../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../../../core/components/pages/Article/components/ArticleWrapper";
import HeaderLarge from "../../../../core/components/vignettes/HeaderLarge";
import Link from "../../../../core/components/controls/Link";
import Main from "../../../../core/components/layouts/Main";

const Dashboard = () => {
  return (
    <Main>
      <ArticleWrapper>
        <HeaderLarge pageTitle="Your Account" />
        <ArticleSection>
          <p style={{ textAlign: "center" }}>
            Go to your{" "}
            <strong>
              <Link to="/account/profile">Profile and Settings</Link>
            </strong>{" "}
            page.
          </p>
        </ArticleSection>
      </ArticleWrapper>
    </Main>
  );
};

export default withRedux(Dashboard);
