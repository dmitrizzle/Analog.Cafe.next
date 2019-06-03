import React from "react";

import { Carousel } from "../core/components/pages/Features/components/Carousel";
import { MUST_READS_CONTENT } from "../core/components/pages/Features/constants";
import { SolidDivider } from "../core/components/pages/Features/components/Posters";
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
          <p>
            All most read, most helpful, and most worthwhile reads are here.👌
          </p>
          <p>
            Improve your film photography understanding and techniques with{" "}
            <strong>“Essential Photography Guides”</strong>.
          </p>
          <p>
            Discover the ever-expanding collection of best-written essays on
            travel, art, self-expression, and creative experiments with{" "}
            <strong>“Photo Essays”</strong>.
          </p>
          <p>
            Lean about the technical advantages and limitations of cameras,
            tools and chemistry and get the writers’ personal account on use and
            ownership with <strong>“Film & Cameras”</strong>.
          </p>
          <h3>Essential Photography Guides</h3>
          <SolidDivider />

          <Carousel items={MUST_READS_CONTENT.guides} {...props} />
          <Carousel
            chop
            items={MUST_READS_CONTENT["download-guides"]}
            {...props}
          />
          <div style={{ height: "6em" }} />

          <h3>Photo Essays</h3>
          <SolidDivider />
          <Carousel items={MUST_READS_CONTENT.essays} {...props} center={1} />
          <Carousel
            chop
            items={MUST_READS_CONTENT["download-essays"]}
            {...props}
          />
          <div style={{ height: "6em" }} />

          <h3>Film & Cameras</h3>
          <SolidDivider />
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
        </ArticleSection>
      </ArticleWrapper>
    </Main>
  );
};
