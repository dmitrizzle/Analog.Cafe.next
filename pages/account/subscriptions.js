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

  return puppy(request)
    .then(r => r.json())
    .then(data => {
      console.log(data);
    });
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

  return puppy(request)
    .then(r => r.json())
    .then(data => {
      console.log(data);
    });
};

const ListDescriptionControl = ({
  email,
  subscriptions,
  provider,
  list,
  children,
}) => {
  const subscriptionLists = subscriptions?.lists || {};
  const currentSubscriptionList = subscriptions.lists[provider];

  const [isSubscribed, setSubscribed] = useState(true);
  const [subscriptionStatus, setSubscriptionStatus] = useState("ok");

  useEffect(() => {
    if (currentSubscriptionList)
      setSubscribed(
        currentSubscriptionList
          ? currentSubscriptionList.indexOf(list) > -1
          : false
      );
  }, currentSubscriptionList);

  let text = isSubscribed ? "End Subscription" : "Subscribe";
  if (subscriptions.status === "pending" || subscriptions.status === "loading")
    text = "Checking Status…";
  if (subscriptionStatus === "loading") text = "Wait";
  if (subscriptions.status === "error") text = "Error";

  return !isSubscribed ? (
    <>
      <h3>{EMAIL_LISTS_MAP[list]}.</h3>
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
              await handleSubscribe(list);
              setSubscriptionStatus("ok");
              setSubscribed(true);
            })();
          }}
        >
          {text}{" "}
          {subscriptionStatus === "loading" && (
            <Spinner style={{ height: ".95em", overflow: "visible" }} />
          )}
        </LinkButton>
      </ButtonGroup>
    </>
  ) : (
    <>
      <h3>{EMAIL_LISTS_MAP[list]}.</h3>
      <p>
        {subscriptionStatus !== "loading" && (
          <>
            ✅ <strong>Subscribed</strong> —{" "}
          </>
        )}
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
            {subscriptionStatus === "loading" ? "wait" : "unsubscribe"}
          </Link>
          {subscriptionStatus === "loading" ? "…" : "."}
        </em>
      </p>
    </>
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

export default withRedux(EmailSubscriptions);
