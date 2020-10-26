import { NextSeo } from "next-seo";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import lscache from "lscache";

import { API } from "../../constants/router/defaults";
import { AccountSeo } from "./";
import { EMAIL_LISTS_MAP } from "../../constants/subscriptions";
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
import puppy from "../../utils/puppy";

const handleUnsubscribe = async (email, list) => {
  const token = lscache.get("token");
  if (!token) return;

  const request = {
    url: API.UNSUBSCRIBE_USER,
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: "JWT " + token,
    },
    data: { email, list },
  };

  return puppy(request)
    .then(r => r.json())
    .then(data => {
      console.log(data);
    });
};

const ChangeStatus = ({ email, subscriptions, provider, list }) => {
  const userSubscriptions = subscriptions?.subscriptions[provider];
  const isSubscribed = userSubscriptions?.indexOf(list) > -1;
  let text = isSubscribed ? "Unsubscribe" : "Subscribe";
  if (subscriptions.status === "pending" || subscriptions.status === "loading")
    text = "Checking Subscription Status…";
  if (subscriptions.status === "error") text = "Error";
  return (
    <ButtonGroup style={{ padding: 0 }}>
      <LinkButton
        disabled={subscriptions.status !== "ok"}
        style={{ margin: 0 }}
        branded={!isSubscribed && subscriptions.status === "ok"}
        onClick={event => {
          event.preventDefault();
          if (isSubscribed) return handleUnsubscribe(email, list);
          return console.log("need to subscribe");
        }}
      >
        {text}
      </LinkButton>
    </ButtonGroup>
  );
};

const EmailSubscriptions = () => {
  const pageTitle = "Email Subscriptions";

  const dispatch = useDispatch();
  const { status, sessionInfo } = useSelector(store => store.user);

  useEffect(() => {
    status === "pending" && dispatch(getUserInfo());
  }, [status]);

  const [subscriptions, setSubscriptions] = useState({
    status: "pending",
    subscriptions: [],
  });
  useEffect(() => {
    const token = lscache.get("token");
    if (!token) return;
    if (subscriptions.status !== "pending") return;

    const request = {
      url: API.SUBSCRIPTIONS,
      method: "get",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: "JWT " + token,
      },
    };

    puppy(request)
      .then(r => r.json())
      .then(subscriptions => {
        if (!subscriptions) setSubscriptions({ status: "error" });
        setSubscriptions({
          status: "ok",
          subscriptions,
        });
      })
      .catch(() => {
        setSubscriptions({ status: "error" });
      });
  }, [subscriptions.status]);

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
              <h3>{EMAIL_LISTS_MAP["letters"]}.</h3>
              <ChangeStatus
                provider="sendgrid"
                list="letters"
                subscriptions={subscriptions}
              />
              <p>
                Don’t miss our{" "}
                <strong>
                  <Link to="/editorials">monthly community reports,</Link> sent
                  every last Thursday of the month.
                </strong>{" "}
                An in-depth summary of the newest photographic products, product
                discontinuations, talent, and art perspectives.
              </p>
              <h3>{EMAIL_LISTS_MAP["price_updates_35"]}.</h3>
              <ChangeStatus
                provider="sendgrid"
                list="price_updates_35"
                subscriptions={subscriptions}
              />
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
