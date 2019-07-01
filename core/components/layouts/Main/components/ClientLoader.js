import React from "react";
import styled from "styled-components";

import { c_black, c_grey_dark } from "../../../../../constants/styles/colors";
import ArticleSection, {
  UnorderedList,
} from "../../../pages/Article/components/ArticleSection";
import ArticleWrapper from "../../../pages/Article/components/ArticleWrapper";
import Email from "../../../vignettes/Email";
import HeaderLarge from "../../../vignettes/HeaderLarge";
import Link from "../../../controls/Link";
import Spinner from "../../../icons/Spinner";

const LoaderWrapper = styled.div`
  width: 1em;
  margin: 0 auto;
  svg {
    margin: 0;
    display: block;
    path {
      stroke: ${c_black};
    }
  }
`;

const HeaderLargeForComposer = styled(HeaderLarge)`
  h2 {
    padding: 0.675em;
  }
`;

export default props => (
  <ArticleWrapper>
    <LoaderWrapper>
      <Spinner />
    </LoaderWrapper>
    <HeaderLargeForComposer pageTitle="Loadindg" pageSubtitle={props.title}>
      <em style={{ display: "block", color: c_grey_dark }}>
        <small>Please wait a moment</small>
      </em>
    </HeaderLargeForComposer>
    <ArticleSection style={{ minHeight: "28em" }}>
      <p style={{ color: c_grey_dark }}>
        <strong>
          Please make sure that you are using latest version of your browser.
        </strong>
      </p>
      <p style={{ color: c_grey_dark }}>
        Android and Internet Explorer users beware: your browsers are not
        supported. Please <Email /> if you need help or would like to submit
        your work over email.
      </p>
      <noscript>
        <h3>Error:</h3>
        <p>
          It seems that your browser does not support JavaScript. Here are some
          things you can do:
        </p>
        <UnorderedList>
          <li>
            <Link to="https://enable-javascript.com/">Enable JavaScript</Link>.
          </li>
          <li>
            <Link to="https://updatemybrowser.org/">Update your browser</Link>.
          </li>
          <li>Try another device or computer.</li>
        </UnorderedList>
      </noscript>
    </ArticleSection>
  </ArticleWrapper>
);
