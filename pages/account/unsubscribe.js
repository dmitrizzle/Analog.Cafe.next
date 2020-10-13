import { NextSeo } from "next-seo";
import { withRouter } from "next/router";
import React, { useEffect } from "react";
import lscache from "lscache";

import { API } from "../../constants/router/defaults";
import { validateEmail } from "../../utils/email";
import ArticleSection from "../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import Email from "../../core/components/vignettes/Email";
import HeaderLarge from "../../core/components/vignettes/HeaderLarge";
import Link from "../../core/components/controls/Link";
import Main from "../../core/components/layouts/Main";
import ga from "../../utils/data/ga";
import puppy from "../../utils/puppy";

const EMAIL_LISTS_MAP = {
  letters: "Community Letters",
  "35mm_price_updates": "35mm Film Price Updates",
};
const STATUS_MAP = {
  anonymized: "Error",
  pending: "Please wait…",
  error: "Error",
  ok: "You’re Unsubscribed",
};

const validateList = id =>
  Object.keys(EMAIL_LISTS_MAP).indexOf(id) >= 0 ? id : undefined;

const Success = () => (
  <>
    <p>
      <strong>Done.</strong> 👍
      <br />
      Here are some other ways you can stay in touch:
    </p>
    <p>
      Follow Analog.Cafe on{" "}
      <Link
        to="https://twitter.com/analog_cafe"
        onClick={() => {
          ga("event", {
            category: "out",
            action: "unsubscribe.twitter",
          });
        }}
      >
        Twitter
      </Link>{" "}
      and{" "}
      <Link
        to="https://instagram.com/analog_cafe"
        onClick={() => {
          ga("event", {
            category: "out",
            action: "unsubscribe.instagram",
          });
        }}
      >
        Instagram
      </Link>
      . Or subscribe to our RSS feed on{" "}
      <Link
        to="http://bit.ly/FeedAnalog"
        onClick={() => {
          ga("event", {
            category: "out",
            action: "unsubscribe.feedly",
          });
        }}
      >
        Feedly
      </Link>
      .
    </p>
    <p>
      You can always re-subscribe to <em>{"Community Letters"}</em> via “Email
      Subscriptions” link on your{" "}
      <Link to="/account/profile">Profile and Settings</Link> page.
    </p>
    <p>
      Questions? <Email>Email</Email>!
    </p>
  </>
);

const STATUS_COMPONENTS_MAP = {
  ok: <Success />,
  anonymized: <p>Can not process your unsubscription request at the moment.</p>,
  error: (
    <p>
      There was an error in our email automation tool. Please{" "}
      <Email>email Dmitri</Email>, and he’ll remove your contact right away.
    </p>
  ),
  pending: <p></p>,
};

const Unsubscribe = withRouter(({ status, list, router }) => {
  const sessionStatus = process.browser
    ? lscache.get("unsubscribe-status")?.status
    : status || "pending";
  const sessionList = process.browser
    ? lscache.get("unsubscribe-status")?.list
    : list;

  useEffect(() => {
    // prevent users from saving/sharing the url
    (() => {
      if (!process.browser) return;
      if (!status) return;
      if (status === "anonymized" || status === "pending") return;

      lscache.flushExpired();
      if (sessionStatus) return;

      lscache.set(
        "unsubscribe-status",
        { status, list: router.query.from } || { status: "error" },
        1
      );
      router.push("/account/unsubscribe");
    })();
  }, [router.asPath]);

  const pageTitle =
    STATUS_MAP[
      router?.query?.email ? sessionStatus || "error" : sessionStatus || status
    ] || STATUS_MAP["error"];
  const pageContent =
    STATUS_COMPONENTS_MAP[
      router?.query?.email ? sessionStatus || "error" : sessionStatus || status
    ] || STATUS_COMPONENTS_MAP["error"];
  const pageSubtitle = sessionList
    ? `From the “${EMAIL_LISTS_MAP[sessionList]}” Email List`
    : "";

  return (
    <>
      <NextSeo title={pageTitle} noindex={true} />
      <Main>
        <HeaderLarge pageTitle={pageTitle} pageSubtitle={pageSubtitle} />
        <ArticleWrapper>
          <ArticleSection>{pageContent}</ArticleSection>
        </ArticleWrapper>
      </Main>
    </>
  );
});

Unsubscribe.getInitialProps = async ({ query }) => {
  if (process.browser) return { status: "pending" };

  const email = validateEmail(query?.r) ? query.r : undefined;
  const list = validateList(query?.from);
  if (!email || !list) return { status: "anonymized" };

  const request = {
    url: API.UNSUBSCRIBE,
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: {
      email,
      list,
    },
  };

  return puppy(request)
    .then(r => r.json())
    .then(({ status }) => {
      return { status, list };
    })
    .catch(() => {
      return { status: "error", list };
    });
};

export default Unsubscribe;
