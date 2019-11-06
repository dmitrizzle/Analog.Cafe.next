import { NextSeo } from "next-seo";
import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { makeFroth } from "../../utils/froth";
import ArticleSection from "../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import ButtonGroup from "../../core/components/controls/Button/components/ButtonGroup";
import Figure from "../../core/components/vignettes/Picture/components/Figure";
import HeaderLarge from "../../core/components/vignettes/HeaderLarge";
import Link from "../../core/components/controls/Link";
import LinkButton from "../../core/components/controls/Button/components/LinkButton";
import Main from "../../core/components/layouts/Main";
import Modal from "../../core/components/controls/Modal";

const StrippedFigure = styled(Figure)`
  cursor: default;
  margin: 0 auto;
  float: none;
  box-shadow: none;
  max-width: 420px;
  figcaption {
    border: none !important;
  }
`;

export const ctaTextInit = () => "Compose Your Submission";
const seoTitleAlternate = "Call for Entries";
const seo = {
  title: "Write, Submit, Get Featured",
  titleAlternate: seoTitleAlternate,
  subtitle: "Stories, Essays, Opinions, Articles, Reviews",
  description:
    "Submit your film photography with 200+ words on any topic. No fees, no deadlines, super-easy & fast. Free editorial reviews and a rapidly growing readership.",
  images: [
    {
      url: makeFroth({ src: "image-froth_1499794_BkFUA89IV", size: "m" }).src,
      alt: seoTitleAlternate,
    },
  ],
};

export const Submit = ({ user }) => (
  <>
    <NextSeo
      title={seo.title}
      description={seo.description}
      openGraph={{
        type: "website",
        images: seo.images,
      }}
    />
    <Main>
      <ArticleWrapper>
        <HeaderLarge pageTitle={seo.title} pageSubtitle={seo.subtitle} />
        <ArticleSection>
          <ButtonGroup style={{ paddingBottom: "1.5em" }}>
            <LinkButton to={"/submit/draft"} branded>
              {ctaTextInit()}
            </LinkButton>
            {user.status === "ok" ? (
              <p>
                See{" "}
                <Link to="/account/all-submissions">
                  <strong>all your submissions</strong>
                </Link>
                .
              </p>
            ) : (
              <p>
                <Link to="/account">
                  <strong>Sign in</strong>
                </Link>{" "}
                if you have an account.
              </p>
            )}
          </ButtonGroup>

          <p>Sending your article or essay to Analog.Cafe is easy.</p>
          <p>
            Click the big button above. Write your title, text, and add images.
            Add styles, links, and edit layout. Once ready, click “Submit for
            Review.”
          </p>

          <h3>How to get featured.</h3>

          <p>
            Best way to get your work selected for publication is to read a few
            articles on the website. This should help you get a better sense for
            the content and styles we favour.
          </p>
          <p>
            For further advice and ideas, read{" "}
            <strong>
              <Link to="/r/open-call-g99w">this guide</Link>
            </strong>
            .
          </p>
        </ArticleSection>
      </ArticleWrapper>
    </Main>
  </>
);

const mapStateToProps = ({ user }) => {
  return { user };
};
export default connect(
  mapStateToProps,
  null
)(Submit);
