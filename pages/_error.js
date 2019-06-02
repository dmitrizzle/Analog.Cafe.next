import React from "react";

import { TEXT_EMOJIS } from "../constants/messages/emojis";
import ArticleSection from "../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../core/components/pages/Article/components/ArticleWrapper";
import Email from "../core/components/vignettes/Email";
import HeaderLarge from "../core/components/vignettes/HeaderLarge";
import Minimal from "../core/components/layouts/Minimal";

const Error = props => (
  <Minimal>
    <ArticleWrapper>
      <HeaderLarge
        pageTitle={"Error: " + props.statusCode || ""}
        pageSubtitle={TEXT_EMOJIS.NEONCAT}
      />
      <ArticleSection>
        {props.statusCode === 404 && <p>Unfortunately, this link is broken.</p>}
        {props.statusCode === 500 && (
          <p>
            Something broke on Analog.Cafe server. Please <Email /> if you need
            assistance.
          </p>
        )}
      </ArticleSection>
    </ArticleWrapper>
  </Minimal>
);

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;
  return { statusCode };
};

export default Error;
