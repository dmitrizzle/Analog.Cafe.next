import { NextSeo } from "next-seo";
import { useSelector } from "react-redux";
import React from "react";

import { API } from "../../constants/router/defaults";
import { AccountSeo } from "./";
import { validateEmail } from "../../utils/email";
import { withRedux } from "../../utils/with-redux";
import ArticleSection from "../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import Email from "../../core/components/vignettes/Email";
import HeaderLarge from "../../core/components/vignettes/HeaderLarge";
import Link from "../../core/components/controls/Link";
import Main from "../../core/components/layouts/Main";
import SignIn from "../../user/components/pages/Account/SignIn";
import ga from "../../utils/data/ga";
import puppy from "../../utils/puppy";

const EmailSubscriptions = ({ status, list }) => {
  const pageTitle = "Email Subscriptions";
  const { istatus, sessionInfo } = useSelector(store => store.user);

  if (status === "pending" || status === "fetching")
    return (
      <>
        <NextSeo title={pageTitle} />
        <ClientLoader />
      </>
    );

  return (
    <>
      <NextSeo title={pageTitle} noindex={true} />
      {status !== "ok" ? (
        <>
          <AccountSeo />
          <SignIn loginAction="/account/email-subscriptions" />
        </>
      ) : (
        <Main>
          <HeaderLarge pageTitle={pageTitle} />
          <ArticleWrapper>
            <ArticleSection>
              <p>...</p>
            </ArticleSection>
          </ArticleWrapper>
        </Main>
      )}
    </>
  );
};

export default withRedux(EmailSubscriptions);
