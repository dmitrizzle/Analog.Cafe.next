import React from "react";

import { TEXT_EMOJIS } from "../constants/messages/emojis";
import ArticleSection from "../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../core/components/pages/Article/components/ArticleWrapper";
import Email from "../core/components/vignettes/Email";
import HeaderLarge from "../core/components/vignettes/HeaderLarge";
import Link from "../core/components/controls/Link";
import Main from "../core/components/layouts/Main";

const Error = props => (
  <Main>
    <ArticleWrapper>
      <HeaderLarge
        pageTitle={
          props.statusCode && props.statusCode !== "Undefined"
            ? "Error: " + props.statusCode
            : "Error"
        }
        pageSubtitle={
          props.statusCode === 404 ? TEXT_EMOJIS.NEONCAT : TEXT_EMOJIS.WTF
        }
      />
      <ArticleSection>
        {props.statusCode === 404 && (
          <p>Page not found.</p>
        )}
        {props.statusCode === 403 && (
          <p>
            You need to be <Link to="/account">signed in</Link> and have a
            permission to view the contents of this page.
          </p>
        )}
        {props.statusCode === 500  && (
            <p>
              Something broke on Analog.Cafe server.
            </p>
          )}
      </ArticleSection>
    </ArticleWrapper>
  </Main>
);

Error.getInitialProps = ({ res, err }) => {
  // 404 is default error code
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
