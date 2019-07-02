import { connect } from "react-redux";
import React, { useEffect } from "react";

import { forgetUser } from "../user/store/actions-user";
import ArticleSection from "../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../core/components/pages/Article/components/ArticleWrapper";
import HeaderLarge from "../core/components/vignettes/HeaderLarge";
import Main from "../core/components/layouts/Main";

export const SignOut = props => {
  useEffect(() => {
    props.forgetUser();
  });

  return (
    <Main>
      <ArticleWrapper>
        <HeaderLarge pageTitle="Good Bye" />
        <ArticleSection>
          <p>You are now signed out of your account.</p>
        </ArticleSection>
      </ArticleWrapper>
    </Main>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    forgetUser: () => {
      dispatch(forgetUser());
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignOut);
