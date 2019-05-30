import React from "react";

import { Carousel } from "../core/components/pages/Features/components/Carousel";
import { MUST_READS_CONTENT } from "../core/components/pages/Features/constants";
import ArticleSection from "../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../core/components/pages/Article/components/ArticleWrapper";
import HeaderLarge from "../core/components/vignettes/HeaderLarge";
import Main from "../core/components/layouts/Main";

export default props => {
  return (
    <Main>
      <ArticleWrapper>
        {/* <MetaTags metaTitle="Features" metaSubtitle="The Best of Analog.Cafe" /> */}
        <HeaderLarge
          pageTitle="Features"
          pageSubtitle="The Best of Analog.Cafe"
        />

        <ArticleSection>
          <Carousel items={MUST_READS_CONTENT.guides} {...props} />
          <Carousel
            chop
            items={MUST_READS_CONTENT["download-guides"]}
            {...props}
          />
          <h3>Essential Photography Guides</h3>
          <p>
            <span role="img" aria-label="Point up">
              ☝︎
            </span>{" "}
            <strong>Above:</strong> articles to help you improve your film
            photography understanding and techniques.
          </p>

          <div style={{ height: "6em" }} />

          <Carousel items={MUST_READS_CONTENT.essays} {...props} center={1} />
          <Carousel
            chop
            items={MUST_READS_CONTENT["download-essays"]}
            {...props}
          />
          <h3>Photo Essays</h3>
          <p>
            <span role="img" aria-label="Point up">
              ☝︎
            </span>{" "}
            <strong>Above:</strong> stories told with images. Read our
            ever-expanding collection of best-written essays on travel, art,
            self-expression, and creative experiments.
          </p>

          <div style={{ height: "6em" }} />

          <Carousel
            items={MUST_READS_CONTENT["camera-reviews"]}
            {...props}
            center={1}
          />
          <Carousel
            chop
            items={MUST_READS_CONTENT.emulsions}
            {...props}
            center={1}
          />
          <h3>Film & Cameras</h3>
          <p>
            <span role="img" aria-label="Point up">
              ☝︎
            </span>{" "}
            <strong>Above:</strong> film photography reviews and guides. Lean
            about the technical advantages and limitations of each tool or
            accessory. Examine the images created with said film or camera. Get
            the writers’ personal account on use and ownership.
          </p>
        </ArticleSection>
      </ArticleWrapper>
    </Main>
  );
};
