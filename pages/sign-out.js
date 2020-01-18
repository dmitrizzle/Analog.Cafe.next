import { NextSeo } from "next-seo";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";

import { TEXT_EMOJIS } from "../constants/messages/emojis";
import { forgetUser } from "../user/store/actions-user";
import { withRedux } from "../utils/with-redux";
import ArticleSection from "../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../core/components/pages/Article/components/ArticleWrapper";
import HeaderLarge from "../core/components/vignettes/HeaderLarge";
import Main from "../core/components/layouts/Main";

export const SignOut = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(forgetUser());
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

export default withRedux(SignOut);
