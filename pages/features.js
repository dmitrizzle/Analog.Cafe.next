import React from "react";
import styled, { keyframes, css } from "styled-components";

import { Carousel } from "../core/components/pages/Features/components/Carousel";
import { MUST_READS_CONTENT } from "../core/components/pages/Features/constants";
import { SolidDivider } from "../core/components/pages/Features/components/Items";
import ArticleSection from "../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../core/components/pages/Article/components/ArticleWrapper";
import HeaderLarge from "../core/components/vignettes/HeaderLarge";
import Main from "../core/components/layouts/Main";

export default props => {
  return (
    <Main>
      <ArticleWrapper>
        <ArticleSection>
          <h3>Essential Photography Guides</h3>
          <SolidDivider />

          <Carousel items={MUST_READS_CONTENT.guides.slice(0, 5)} {...props} />
          <Carousel
            chop
            items={MUST_READS_CONTENT.guides.slice(5, 15)}
            {...props}
          />

          <div style={{ height: "6em" }} />

          <h3>Film Cameras</h3>
          <SolidDivider />
          <Carousel
            items={MUST_READS_CONTENT["camera-reviews"].slice(0, 5)}
            {...props}
            center={1}
          />
          <Carousel
            chop
            items={MUST_READS_CONTENT["camera-reviews"].slice(5, 15)}
            {...props}
            center={1}
          />

          <div style={{ height: "6em" }} />

          <h3>Chemistry</h3>
          <SolidDivider />
          <Carousel
            items={MUST_READS_CONTENT.emulsions.slice(0, 5)}
            {...props}
            center={1}
          />
          <Carousel
            chop
            items={MUST_READS_CONTENT.emulsions.slice(5, 15)}
            {...props}
            center={1}
          />

          <div style={{ height: "6em" }} />

          <h3>Photo Essays</h3>
          <SolidDivider />
          <Carousel
            items={MUST_READS_CONTENT.essays.slice(0, 5)}
            {...props}
            center={1}
          />
          <Carousel
            chop
            items={MUST_READS_CONTENT.essays.slice(5, 15)}
            {...props}
            center={1}
          />

          <div style={{ height: "6em" }} />

          <h3>Download & Print</h3>
          <SolidDivider />
          <Carousel
            items={MUST_READS_CONTENT.download.slice(0, 5)}
            {...props}
          />
          <Carousel
            chop
            items={MUST_READS_CONTENT.download.slice(5, 15)}
            {...props}
          />
        </ArticleSection>
      </ArticleWrapper>
    </Main>
  );
};
