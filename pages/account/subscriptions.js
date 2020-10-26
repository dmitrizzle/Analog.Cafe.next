import { NextSeo } from "next-seo";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";

import { AccountSeo } from "./";
import { getUserInfo } from "../../user/store/actions-user";
import { withRedux } from "../../utils/with-redux";
import ArticleSection from "../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import Button from "../../core/components/controls/Button";
import ButtonGroup from "../../core/components/controls/Button/components/ButtonGroup";
import ClientLoader from "../../core/components/layouts/Main/components/ClientLoader";
import HeaderLarge from "../../core/components/vignettes/HeaderLarge";
import Link from "../../core/components/controls/Link";
import LinkButton from "../../core/components/controls/Button/components/LinkButton";
import Main from "../../core/components/layouts/Main";
import SignIn from "../../user/components/pages/Account/SignIn";

const EmailSubscriptions = () => {
  const pageTitle = "Email Subscriptions";

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

              <ButtonGroup style={{ padding: 0 }}>
                <LinkButton style={{ margin: 0 }}>Unsubscribe</LinkButton>
              </ButtonGroup>
              <p>
                A series of{" "}
                <strong>
                  <Link to="/editorials">monthly announcements,</Link> sent
                  every last Thursday of the month.
                </strong>{" "}
                They introduce film photography’s newest products, product
                discontinuations, talent, and art perspectives.
              </p>
              <h3>35mm Film — Price Alerts.</h3>
              <ButtonGroup style={{ padding: 0 }}>
                <LinkButton branded style={{ margin: 0 }}>
                  Subscribe
                </LinkButton>
              </ButtonGroup>
              <p>
                Manage your photographic expenses better with this occasional
                (max 4x a year) email newsletter. <em>Price Alerts</em> will
                notify you of the latest <strong>changes in film costs</strong>{" "}
                and discuss the trends based on data from{" "}
                <Link to="/app/35mm-film-price-guide">
                  35mm Film Price Guide
                </Link>
                .
              </p>
            </ArticleSection>
          </ArticleWrapper>
        </Main>
      )}
    </>
  );
};

export default withRedux(EmailSubscriptions);
