import React from "react";

import ArticleSection, {
  UnorderedList,
} from "../../../pages/Article/components/ArticleSection";
import ArticleWrapper from "../../../pages/Article/components/ArticleWrapper";
import HeaderLarge from "../../../vignettes/HeaderLarge";
import Link from "../../../controls/Link";
import Main from "..";
import Spinner from "../../../icons/Spinner";

export default props => (
  <Main>
    <ArticleWrapper>
      <HeaderLarge pageTitle="Loading" pageSubtitle={props.title} />
      <ArticleSection style={{ minHeight: "28em" }}>
        <Spinner inverse style={{ margin: "1.5em auto", display: "block" }} />
        <noscript>
          <h3>Error:</h3>
          <p>
            It seems that your browser does not support JavaScript. Here are
            some things you can do:
          </p>
          <UnorderedList>
            <li>
              <Link to="https://enable-javascript.com/">Enable JavaScript</Link>
              .
            </li>
            <li>
              <Link to="https://updatemybrowser.org/">Update your browser</Link>
              .
            </li>
            <li>Try another device or computer.</li>
          </UnorderedList>
        </noscript>
      </ArticleSection>
    </ArticleWrapper>
  </Main>
);
