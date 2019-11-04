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

export const ctaTextInit = () => "Submit Now";
const seoTitleAlternate = "Call for Entries";
const seo = {
  title: "Submit",
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

          <Modal
            unmarked
            element="a"
            with={{
              info: {
                image: "image-froth_1499794_BkFUA89IV",
                title: seo.titleAlternate,
                text: seo.description,
                buttons: [
                  {
                    to: "/submit/draft",
                    text: "Submit Your Work",
                    branded: true,
                  },
                ],
              },
              id: "help/submissions",
            }}
          >
            <Figure
              src="image-froth_1499794_BkFUA89IV"
              feature
              alt={seo.description}
            />
          </Modal>
          <p>
            If you love shooting film and have a story to share, Analog.Cafe
            could be a good place for it.
          </p>
          <p>
            <Link to="/about">We</Link> feature fun, beautiful, creative,
            educational, and entertaining pieces written by casual and regular
            contributors. We celebrate every new contribution on{" "}
            <Link to="https://twitter.com/analog_cafe">social</Link>{" "}
            <Link to="https://instagram.com/analog_cafe">media</Link>, monthly
            community newsletter, and the front <Link to="/">page</Link>.
          </p>
          <p>
            All accepted submissions are edited for grammar and style to read
            well for years to come. We pride ourselves in the ability to bring
            out the best in even the least experienced writers.
          </p>

          <p>
            There are no technical limitations to your submission other than
            10MB or smaller JPG images. You retain{" "}
            <Link to="/submit/rules">all</Link> of the rights and ownership to
            the photographs and the text you submit.
          </p>
          <h3>How to get published.</h3>

          <p>
            Best way to get your work selected for publication is to read a few
            articles on the website. This should help you get a better sense for
            content and style.
          </p>
          <p>
            For further advice and ideas, read{" "}
            <strong>
              <Link to="/r/open-call-g99w">this guide</Link>
            </strong>
            .
          </p>
          <StrippedFigure src="image-froth_1963351_HJUmY88I4" />
          <div style={{ clear: "both" }} />

          <ButtonGroup style={{ paddingBottom: "1.5em", paddingTop: 0 }}>
            <LinkButton to={"/submit/draft"} branded>
              {ctaTextInit()}
            </LinkButton>
            <p>
              <Link to="/account">
                <strong>Sign in</strong>
              </Link>{" "}
              if you have an account.
            </p>
          </ButtonGroup>
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
