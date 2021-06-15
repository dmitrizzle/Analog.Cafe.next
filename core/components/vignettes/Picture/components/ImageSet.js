import LazyLoad from "react-lazyload";
import React from "react";
import styled from "styled-components";

import { makeFroth } from "../../../../../utils/froth";
import Placeholder from "./Placeholder";

const COMMON_RATIOS = {
  1: "1x1",
  1.2: "6x5",
  1.25: "5x4",
  1.3: "4x3",
  1.38: "11x8",
  1.43: "IMAX (1.43)",
  1.5: "3x2",
  1.62: "“golden” (1.618)",
  1.6: "5x3",
  1.7: "16x9",
  1.85: "“cinema” (1.85)",
  1.9: "“4K” (1.9)",
  2.2: "70mm film standard (2.2)",
  2.3: "7x3",
  2.35: "“widescreen” (2.35)",
  3.5: "18x5",
  4: "4x1",
};

const ImageSet = props => {
  let src = props.src;

  const frothWEBPsmall = makeFroth({ src, size: "s", type: "webp" });
  const frothJPEGmedium = makeFroth({ src, size: "m" });

  const className = props.className;

  // if nothing else is available,
  const ratioHuman =
    COMMON_RATIOS[Math.round(frothWEBPsmall.ratio * 100) / 100];
  let alt = `${props.feature ? "Large" : "Small"} image with ${
    ratioHuman || frothWEBPsmall.ratio
  } aspect ratio.`;

  // if caption is available, use caption
  if (props.caption) alt = props.caption;

  // if alt is explicitly stated, use alt
  if (props.alt) alt = props.alt;

  let largestSize = props.feature ? "l" : "m";
  return (
    <>
      <Placeholder preserve frothId={src}>
        <LazyLoad unmountIfInvisible once offset={300} height={"100%"}>
          <picture>
            {!src.includes("data:image") && (
              <>
                <source
                  data-source-designation={`AVIF-s`}
                  srcSet={makeFroth({ src, size: "s", type: "avif" }).src}
                  media="(max-width: 480px)"
                  type="image/avif"
                  className={className}
                />
                <source
                  data-source-designation={`AVIF-m`}
                  srcSet={makeFroth({ src, size: "m", type: "avif" }).src}
                  media="(max-width: 1200px)"
                  type="image/avif"
                  className={className}
                />
                {/* AVIF encoding is currently limited to width of 4096px and/or height of 2160px. */}
                {frothWEBPsmall.ratio > 0.9 && (
                  <source
                    data-source-designation={`AVIF-${largestSize}`}
                    srcSet={
                      makeFroth({ src, size: largestSize, type: "avif" }).src
                    }
                    media="(min-width: 1201px)"
                    type="image/avif"
                    className={className}
                  />
                )}

                <source
                  data-source-designation={`WEBP-s`}
                  srcSet={frothWEBPsmall.src}
                  media="(max-width: 480px)"
                  type="image/webp"
                  className={className}
                />
                <source
                  data-source-designation={`WEBP-m`}
                  srcSet={makeFroth({ src, size: "m", type: "webp" }).src}
                  media="(max-width: 1200px)"
                  type="image/webp"
                  className={className}
                />
                <source
                  data-source-designation={`WEBP-${largestSize}`}
                  srcSet={
                    makeFroth({ src, size: largestSize, type: "webp" }).src
                  }
                  media="(min-width: 1201px)"
                  type="image/webp"
                  className={className}
                />

                <source
                  data-source-designation={`JPG-s`}
                  srcSet={makeFroth({ src, size: "s" }).src}
                  media="(max-width: 480px)"
                  className={className}
                />
                <source
                  data-source-designation={`JPG-m`}
                  srcSet={frothJPEGmedium.src}
                  media="(max-width: 1200px)"
                  className={className}
                />
                <source
                  data-source-designation={`JPG-${largestSize}`}
                  srcSet={makeFroth({ src, size: largestSize }).src}
                  media="(min-width: 1201px)"
                  className={className}
                />
              </>
            )}

            {/* JPG FALLBACKS */}
            <noscript>
              <img
                src={frothJPEGmedium.src}
                alt={alt}
                className={className}
                style={{ height: frothJPEGmedium.ratio ? "100%" : "initial" }}
                loading="lazy"
              />
            </noscript>
            <img
              src={frothJPEGmedium.src}
              alt={alt}
              className={className}
              style={{ height: frothJPEGmedium.ratio ? "100%" : "initial" }}
              loading="lazy"
            />
          </picture>
        </LazyLoad>
      </Placeholder>
    </>
  );
};

// eslint-disable-next-line
export default styled(({ style, ...props }) => (
  <ImageSet
    {...props}
    onContextMenu={event => props.protected && event.preventDefault()}
  />
))`
  width: 100%;
  height: auto;
  display: block;
  text-align: center;
  font-style: italic;
  ${props =>
    props.protected &&
    `
		-webkit-touch-callout : none;
		user-select : none;
		pointer-events: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	`};
`;
