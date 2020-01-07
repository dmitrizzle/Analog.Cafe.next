import { NextSeo } from "next-seo";
import React, { useEffect } from "react";
import { withRouter } from "next/router";

import { TEXT_EMOJIS } from "../constants/messages/emojis";
import { invalidate } from "../utils/server-cache";
import ArticleSection from "../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../core/components/pages/Article/components/ArticleWrapper";
import HeaderLarge from "../core/components/vignettes/HeaderLarge";
import Link from "../core/components/controls/Link";
import Main from "../core/components/layouts/Main";

const STATUS_CODE_MESSAGE = {
  "404": {
    text: "Page not found.",
  },
  "403": {
    jsx: (
      <p>
        You need to be <Link to="/account">signed in</Link> and have a
        permission to view the contents of this page.
      </p>
    ),
    text:
      "You need to be signed in and have a permission to view the contents of this page.",
  },
  "500": {
    text:
      "Are you offline? There seems to be either a problem with our server or your network. Please try again in a bit.",
  },
};

const Error = props => {
  const seo = {
    title:
      props.statusCode && props.statusCode !== "Undefined"
        ? "Error: " + props.statusCode
        : "Error",
    description: STATUS_CODE_MESSAGE[props.statusCode + ""]
      ? STATUS_CODE_MESSAGE[props.statusCode + ""].text
      : "",
  };

  // invalidate cacle for error pages
  const { asPath } = props.router;
  useEffect(() => {
    invalidate(asPath);
  }, [asPath]);

  return (
    <>
      <NextSeo title={seo.title} description={seo.description} />
      <Main>
        <ArticleWrapper>
          <HeaderLarge
            pageTitle={seo.title}
            pageSubtitle={
              props.statusCode === 404 ? TEXT_EMOJIS.NEONCAT : TEXT_EMOJIS.WTF
            }
          />
          <ArticleSection>
            {props.statusCode === 404 && (
              <p>{STATUS_CODE_MESSAGE["404"].text}</p>
            )}
            {props.statusCode === 403 && STATUS_CODE_MESSAGE["403"].jsx}
            {props.statusCode === 500 && (
              <p>{STATUS_CODE_MESSAGE["500"].text}</p>
            )}
          </ArticleSection>
        </ArticleWrapper>
      </Main>
    </>
  );
};

Error.getInitialProps = ({ req, res, err }) => {
  // 404 is default error code
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default withRouter(Error);
