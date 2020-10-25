import { NextSeo } from "next-seo";
import React from "react";

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

const EmailSubscriptions = ({ status, list }) => {
  const pageTitle = "Email Subscriptions";

  return (
    <>
      <NextSeo title={pageTitle} noindex={true} />
      <Main>
        <HeaderLarge pageTitle={pageTitle} />
        <ArticleWrapper>
          <ArticleSection>
            <p>...</p>
          </ArticleSection>
        </ArticleWrapper>
      </Main>
    </>
  );
};

export default EmailSubscriptions;
