import React from "react";
import styled, { keyframes, css } from "styled-components";

import { Carousel } from "../core/components/pages/Features/components/Carousel";
import { MUST_READS_CONTENT } from "../core/components/pages/Features/constants";
import { SolidDivider } from "../core/components/pages/Features/components/Items";
import ArticleSection from "../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../core/components/pages/Article/components/ArticleWrapper";
import HeaderLarge from "../core/components/vignettes/HeaderLarge";
import Main from "../core/components/layouts/Main";

const appear = keyframes`
  from {
    visibility: hidden;
  }
  to {
    visibility: visible;
  }
`;

const AnimatedChar = styled.span`
  visibility: hidden;
  animation: ${appear} 0ms ${({ order }) => order * 12 + 1}ms forwards;
`;

export default props => {
  return (
    <Main>
      <ArticleWrapper>
        <ArticleSection>
          <h3>
            {Array.from("Essential Photography Guides").map((char, order) => (
              <AnimatedChar key={order} order={order}>
                {char}
              </AnimatedChar>
            ))}
          </h3>
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
