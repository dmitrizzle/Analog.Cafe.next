import { NextSeo } from "next-seo";
import { connect } from "react-redux";
import React, { useEffect } from "react";

import { TEXT_EMOJIS } from "../constants/messages/emojis";
import { forgetUser } from "../user/store/actions-user";
import ArticleSection from "../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../core/components/pages/Article/components/ArticleWrapper";
import HeaderLarge from "../core/components/vignettes/HeaderLarge";
import Main from "../core/components/layouts/Main";

export const SignOut = props => {
  useEffect(() => {
    props.forgetUser();
  });

  const seo = {
    title: "Good Bye",
    subtitle: TEXT_EMOJIS.SAD,
    description: "You are now signed out of your account.",
  };

  return (
    <>
      <NextSeo title={seo.title} description={seo.description} />
      <Main>
        <ArticleWrapper>
          <HeaderLarge pageTitle={seo.title} pageSubtitle={seo.subtitle} />
          <ArticleSection>
            <p>{seo.description}</p>
          </ArticleSection>
        </ArticleWrapper>
      </Main>
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    forgetUser: () => {
      dispatch(forgetUser());
    },
  };
};

export default connect(null, mapDispatchToProps)(SignOut);
