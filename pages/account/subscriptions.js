import { NextSeo } from "next-seo";
import { withRouter } from "next/router";
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
import ButtonGroup from "../../core/components/controls/Button/components/ButtonGroup";
import ClientLoader from "../../core/components/layouts/Main/components/ClientLoader";
import HeaderLarge from "../../core/components/vignettes/HeaderLarge";
import Link from "../../core/components/controls/Link";
import LinkButton from "../../core/components/controls/Button/components/LinkButton";
import Main from "../../core/components/layouts/Main";
import SignIn from "../../user/components/pages/Account/SignIn";
import Spinner from "../../core/components/icons/Spinner";
import puppy from "../../utils/puppy";

const handleUnsubscribe = list => {
  const token = lscache.get("token");
  if (!token) return;

  const request = {
    url: API.UNSUBSCRIBE_USER,
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: "JWT " + token,
    },
    data: { list },
  };

  return puppy(request).then(r => r.json());
};

const handleSubscribe = list => {
  const token = lscache.get("token");
  if (!token) return;

  const request = {
    url: API.SUBSCRIBE_USER,
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: "JWT " + token,
    },
    data: { list },
  };

  return puppy(request).then(r => r.json());
};

const ListDescriptionControl = ({
  subscriptions,
  provider,
  list,
  children,
}) => {
  const currentSubscriptionList = subscriptions.lists[provider];

  const [isSubscribed, setSubscribed] = useState(
    currentSubscriptionList ? currentSubscriptionList.indexOf(list) > -1 : false
  );
  const [subscriptionStatus, setSubscriptionStatus] = useState("ok");

  useEffect(() => {
    if (currentSubscriptionList)
      setSubscribed(
        currentSubscriptionList
          ? currentSubscriptionList.indexOf(list) > -1
          : false
      );
  }, [currentSubscriptionList]);

  let text = isSubscribed ? "End Subscription" : "Subscribe";
  if (subscriptions.status === "pending" || subscriptions.status === "loading")
    text = "Checking Status…";
  if (subscriptionStatus === "loading") text = "Wait";
  if (subscriptions.status === "error") text = "Error";

  return !isSubscribed && subscriptions.status === "ok" ? (
    <>
      <h3 id={list}>{EMAIL_LISTS_MAP[list]}.</h3>
      {children}
      <ButtonGroup style={{ padding: "0 0 3em" }}>
        <LinkButton
          disabled={
            subscriptions.status !== "ok" || subscriptionStatus === "loading"
          }
          branded={!isSubscribed && subscriptions.status === "ok"}
          onClick={event => {
            event.preventDefault();
            event.target.blur();
            return (async () => {
              setSubscriptionStatus("loading");
              let response = { status: "pending" };
              response = await handleSubscribe(list);
              setSubscriptionStatus(response?.status);
              response?.status.statusCode <= 210 && setSubscribed(true);
            })();
          }}
        >
          {text}{" "}
          {subscriptionStatus === "loading" && (
            <Spinner style={{ height: ".95em", overflow: "visible" }} />
          )}
        </LinkButton>
        {subscriptionStatus === "error" && (
          <p>
            ⚠️{" "}
            <em>
              <strong>Error:</strong> could not process your request.
            </em>
          </p>
        )}
      </ButtonGroup>
    </>
  ) : (
    <>
      <h3 id={list}>{EMAIL_LISTS_MAP[list]}.</h3>
      <p>
        {subscriptionStatus !== "loading" && subscriptions.status === "ok" && (
          <>
            <small>✅ </small>
            <strong>Subscribed</strong> —{" "}
          </>
        )}
        {subscriptionStatus !== "error" ? (
          <em>
            <Link
              to="#unsubscribe"
              onClick={event => {
                event.preventDefault();
                (async () => {
                  setSubscriptionStatus("loading");
                  await handleUnsubscribe(list);
                  setSubscriptionStatus("ok");
                  setSubscribed(false);
                })();
              }}
            >
              {subscriptionStatus === "loading" || subscriptions.status !== "ok"
                ? "Wait"
                : "unsubscribe"}
            </Link>
            {subscriptionStatus === "loading" || subscriptions.status !== "ok"
              ? "…"
              : "."}
          </em>
        ) : (
          <>
            <small>⚠️ </small>
            <strong>Error.</strong>
          </>
        )}
      </p>
    </>
  );
};

const EmailSubscriptions = ({ router }) => {
  const pageTitle = "Email Subscriptions";

  const dispatch = useDispatch();
  const { status } = useSelector(store => store.user);

  useEffect(() => {
    status === "pending" && dispatch(getUserInfo());
  }, [status]);

  const [subscriptions, setSubscriptions] = useState({
    status: "pending",
    lists: [],
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
      .then(lists => {
        if (!lists) setSubscriptions({ status: "error" });
        setSubscriptions({
          status: "ok",
          lists,
        });
      })
      .catch(() => {
        setSubscriptions({ status: "error" });
      });
  }, [subscriptions.status]);

  // auto-subscribe links
  const addToList = router?.query?.add;
  useEffect(() => {
    (async () => {
      if (
        status === "ok" &&
        subscriptions.status === "ok" &&
        subscriptions.lists["sendgrid"].indexOf(addToList) < 0 &&
        addToList &&
        EMAIL_LISTS_MAP[addToList]
      ) {
        setSubscriptions({ ...subscriptions, status: "pending" });

        let response;
        response = await handleSubscribe(addToList);
        if (response?.status.statusCode <= 210) {
          setSubscriptions({
            status: "ok",
            lists: {
              sendgrid: [...(subscriptions?.list?.sendgrid || []), addToList],
            },
          });
        }
      }
    })();
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
          <SignIn
            loginAction={
              `/account/subscriptions` +
              (router?.query?.add ? `?add=${router?.query?.add}` : "")
            }
          />
        </>
      ) : (
        <Main>
          <HeaderLarge pageTitle={pageTitle} />

          <ArticleWrapper>
            <ArticleSection>
              <ListDescriptionControl
                provider="sendgrid"
                list="letters"
                subscriptions={subscriptions}
              >
                Don’t miss our{" "}
                <strong>
                  <Link to="/editorials">monthly community reports,</Link> sent
                  every last Thursday of the month.
                </strong>{" "}
                An in-depth summary of the newest photographic products, product
                discontinuations, talent, and art perspectives.
              </ListDescriptionControl>

              <ListDescriptionControl
                provider="sendgrid"
                list="price_updates_35"
                subscriptions={subscriptions}
              >
                Manage your photographic expenses better with this occasional
                (max 4x a year) email newsletter. <em>Price Alerts</em> will
                notify you of the latest <strong>changes in film costs</strong>{" "}
                and discuss the trends based on data from{" "}
                <Link to="/app/35mm-film-price-guide">
                  35mm Film Price Guide
                </Link>
                .
              </ListDescriptionControl>
            </ArticleSection>
          </ArticleWrapper>
        </Main>
      )}
    </>
  );
};

export default withRouter(withRedux(EmailSubscriptions));
