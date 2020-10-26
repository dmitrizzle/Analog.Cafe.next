import { NextSeo } from "next-seo";
import React from "react";

import { API } from "../../constants/router/defaults";
import { EMAIL_LISTS_MAP } from "../../constants/subscriptions";
import { validateEmail } from "../../utils/email";
import ArticleSection from "../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import Email from "../../core/components/vignettes/Email";
import HeaderLarge from "../../core/components/vignettes/HeaderLarge";
import Link from "../../core/components/controls/Link";
import Main from "../../core/components/layouts/Main";
import ga from "../../utils/data/ga";
import puppy from "../../utils/puppy";

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
      Questions? <Email>Email</Email>!
    </p>
  </>
);

const STATUS_COMPONENTS_MAP = {
  ok: <Success />,
  anonymized: (
    <p>
      Can not process your unsubscription request, some parameters are missing.
    </p>
  ),
  error: (
    <p>
      Could not process your request. Please <Email>email Dmitri</Email>, and
      he’ll remove your contact right away.
    </p>
  ),
  pending: <p></p>,
};

const Unsubscribe = ({ status, list }) => {
  const pageTitle = STATUS_MAP[status];
  const pageContent = STATUS_COMPONENTS_MAP[status];
  const pageSubtitle = list
    ? `From the “${EMAIL_LISTS_MAP[list]}” Email List`
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
};

Unsubscribe.getInitialProps = async ({ query }) => {
  const parsedEmail = query?.r?.replace(" ", "+");
  const email = validateEmail(parsedEmail) ? parsedEmail : undefined;

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
