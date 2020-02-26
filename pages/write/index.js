import { NextSeo } from "next-seo";
import { useSelector } from "react-redux";
import React from "react";

import { makeFroth } from "../../utils/froth";
import { withRedux } from "../../utils/with-redux";
import ArticleSection from "../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import ButtonGroup from "../../core/components/controls/Button/components/ButtonGroup";
import Email from "../../core/components/vignettes/Email";
import Figure from "../../core/components/vignettes/Picture/components/Figure";
import HeaderLarge from "../../core/components/vignettes/HeaderLarge";
import Link from "../../core/components/controls/Link";
import LinkButton from "../../core/components/controls/Button/components/LinkButton";
import Main from "../../core/components/layouts/Main";

export const ctaTextInit = () => "Submit Article to Get Featured";
const seoTitleAlternate = "Call for Entries";
const seo = {
  title: "Get Featured on Analog.Cafe",
  titleAlternate: seoTitleAlternate,
  subtitle: "Open call for: Stories, Essays, Opinions, Articles, Reviews",
  description:
    "Submit your film photography with 200+ words on any topic. No fees, no deadlines, super-easy & fast. Free editorial reviews and a rapidly growing readership.",
  images: [
    {
      url: makeFroth({ src: "image-froth_1499794_BkFUA89IV", size: "m" }).src,
      alt: seoTitleAlternate,
    },
  ],
};

export const Submit = () => {
  const user = useSelector(state => state.user);

  return (
    <>
      <NextSeo
        title={seo.title}
        description={seo.description}
        openGraph={{
          type: "website",
          images: seo.images,
        }}
      />
      <Main title={"Submissions"}>
        <ArticleWrapper>
          <HeaderLarge pageTitle={seo.title} pageSubtitle={seo.subtitle} />
          <ArticleSection>
            <ButtonGroup style={{ paddingBottom: "1.5em" }}>
              <LinkButton to={"/write/draft"} branded>
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

            <p>
              Want your story and photography featured on Analog.Cafe? Easy!
            </p>
            <p>
              Click the big button above. Write your title, text, and add
              images. Add styles, links, and edit layout. Once ready, click
              “Submit for Review.”
            </p>

            <h3>What you get.</h3>
            <p>
              In his 1934 paper on aesthetics “Art as Experience,” John Dewy
              describes art as a bond between the audience and the expressive
              object. <strong>Art is a form of communication.</strong>
            </p>
            <p>
              Analog.Cafe is your platform to share your creative expressions
              and help others do the same.
            </p>
            <p>
              Once accepted, your work will go through a careful{" "}
              <strong>editorial process.</strong> Having a second set of
              discerning eyes on written work helps us keep the quality of
              content high and rejection rate low.
            </p>
            <p>
              Your insights and creative energy provide intellectual nourishment
              to our growing readership that, as of January 2020, ingests
              150,000+ pages per year.
            </p>
            <p>
              Contributor profiles are exposed prominently throughout articles.
              You are welcome to share links to your work on your profile and
              within your article. “Magic link” feature lets you promote your
              website, social profile, Etsy store, or a{" "}
              <Link to="https://ko-fi.com/">Ko-Fi</Link>/
              <Link to="https://www.buymeacoffee.com/">Buy Me a Coffee</Link>{" "}
              funding tools.
            </p>
            <p>
              Your questions and concerns are addressed directly by the person
              who’s responsible for all the content and technical features on
              Analog. Cafe – <Link to="/u/dmitrizzle">Dmitri</Link>. Feel free
              to <Email /> me anytime!
            </p>

            <h3>How to get featured.</h3>

            <p>
              Best way to get your work selected for publication is to read a
              few articles on the website. This should help you get a better
              sense for the content and styles we favour.
            </p>
            <p>
              For further advice and ideas, read{" "}
              <strong>
                <Link to="/r/open-call-g99w">this guide</Link>
              </strong>
              .
            </p>
            <ButtonGroup style={{ paddingBottom: "1.5em" }}>
              <LinkButton to={"/write/draft"} branded>
                {ctaTextInit()}
              </LinkButton>
            </ButtonGroup>
            <Figure src="image-froth_2555477_ByWOeQdOS" feature />
            <Figure
              src="image-froth_1502090_n7INwx5B"
              feature
              style={{ marginTop: 0 }}
            />
            <Figure
              src="image-froth_653495_SJSB4AmUQ"
              feature
              style={{ marginTop: 0 }}
            />
            <ButtonGroup style={{ paddingBottom: "1.5em" }}>
              <LinkButton to={"/write/draft"} branded>
                {ctaTextInit()}
              </LinkButton>
            </ButtonGroup>
          </ArticleSection>
        </ArticleWrapper>
      </Main>
    </>
  );
};

export default withRedux(Submit);
