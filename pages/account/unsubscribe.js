import { NextSeo } from "next-seo";
import { withRouter } from "next/router";
import React, { useEffect, useState } from "react";

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

const STATUS_MAP = {
  pending: "Unsubscribing…",
  error: "Error",
  ok: "You’re Unsubscribed",
};
const STATUS_COMPONENTS = {
  ok: (
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
  ),
  pending: <p>Please wait a moment.</p>,
  error: (
    <p>
      There was an error in the system that tried to unsubscribe you. Please{" "}
      <Email>email Dmitri</Email>, and he’ll remove your contact right away.
    </p>
  ),
};

const validateList = id =>
  ["letters", "35mm_price_updates"].indexOf(id) >= 0 ? id : false;

const Unsubscribe = withRouter(({ router, srQuery }) => {
  const [subscriptionStatus, setSubscriptionStatus] = useState("pending");

  useEffect(() => {
    const email = validateEmail(router.query?.r || srQuery?.r);
    const list = validateList(router.query?.from || srQuery?.from);

    console.log(email, list);

    if (!email || !list) setSubscriptionStatus("error");
    else {
      console.log(1);
      const request = {
        url: API.UNSUBSCRIBE,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        data: {
          email,
          list,
        },
      };
      puppy(request)
        .then(r => r.json())
        .then(response => {
          console.log(response);
          setSubscriptionStatus(response.status || "error");
        })
        .catch(() => {
          setSubscriptionStatus("error");
        });
    }
  }, []);

  const pageTitle = STATUS_MAP[subscriptionStatus];
  const pageSubtitle = `From the “${"Community Letters"}” Email List`;

  return (
    <>
      <NextSeo title={pageTitle} />
      <Main>
        <HeaderLarge pageTitle={pageTitle} pageSubtitle={pageSubtitle} />
        <ArticleWrapper>
          <ArticleSection>
            {STATUS_COMPONENTS[subscriptionStatus]}
          </ArticleSection>
        </ArticleWrapper>
      </Main>
    </>
  );
});

Unsubscribe.getInitialProps = ctx => {
  return { srQuery: ctx?.query };
};

export default Unsubscribe;
