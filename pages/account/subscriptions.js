import { NextSeo } from "next-seo";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";

import { API } from "../../constants/router/defaults";
import { AccountSeo } from "./";
import { getUserInfo } from "../../user/store/actions-user";
import { validateEmail } from "../../utils/email";
import { withRedux } from "../../utils/with-redux";
import ArticleSection from "../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import ClientLoader from "../../core/components/layouts/Main/components/ClientLoader";
import Email from "../../core/components/vignettes/Email";
import HeaderLarge from "../../core/components/vignettes/HeaderLarge";
import Link from "../../core/components/controls/Link";
import Main from "../../core/components/layouts/Main";
import SignIn from "../../user/components/pages/Account/SignIn";
import ga from "../../utils/data/ga";
import puppy from "../../utils/puppy";

const EmailSubscriptions = () => {
  const pageTitle = "Your Subscriptions";

  const dispatch = useDispatch();
  const { status, sessionInfo } = useSelector(store => store.user);

  useEffect(() => {
    status === "pending" && dispatch(getUserInfo());
  }, [status]);

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
          <SignIn loginAction="/account/subscriptions" />
        </>
      ) : (
        <Main>
          <HeaderLarge pageTitle={pageTitle} />
          <ArticleWrapper>
            <ArticleSection>
              <h3>Community Letters.</h3>
              <p>
                Today, analogue photography is a growing, evolving community of
                manufacturers and creatives. New products are released monthly,
                and sadly, some are occasionally discontinued. Community Letters
                is{" "}
                <strong>
                  <Link to="/editorials">a series</Link>
                </strong>{" "}
                of monthly updates where I introduce the news and chat about the
                state of our creative niche in-general.{" "}
                <em>
                  — <Link to="/u/dmitrizzle">Dmitri</Link>.
                </em>
              </p>
            </ArticleSection>
          </ArticleWrapper>
        </Main>
      )}
    </>
  );
};

export default withRedux(EmailSubscriptions);
