import React from "react";
import styled from "styled-components";

import { STATUS } from "../constants";
import { c_black, c_red } from "../../../../../constants/styles/colors";
import { getTitleFromSlug } from "../../../../../utils/url-slugs";
import { readingTime } from "../../../../../utils/time";
import { title } from "../../../../../constants/styles/typography";

export const Stats = styled.span`
  ${title}
  margin: 0;
  color: ${c_red};
  ${props => props.status === "loading" && `letter-spacing: 0 !important;`};
`;

export const readType = (images, readingTime) => {
  const longRead = readingTime > 4 ? true : false;
  const wellIllustrated = images / readingTime > 1 ? true : false;
  const inDepth = wellIllustrated && longRead ? true : false;

  if (inDepth) return "in-depth";
  if (wellIllustrated) return "well-illustrated";
  if (longRead) return "long-read";
  return "quick-read";
};

export const ReadType = styled.span`
  padding: 0.5em;
  color: ${c_black};
  font-variant: all-petite-caps;
`;

export default props => {
  return (
    <Stats>
      {props.item.type !== "placeholder" &&
        props.private &&
        props.item.tag &&
        "#"}
      {props.item.type !== "placeholder" &&
        (props.item.tag
          ? getTitleFromSlug(props.item.tag, {
              smartTagFromImageCount: props.item.stats.images,
            })
          : "Submitted")}
      {props.item.stats && (
        <ReadType
          title={`${props.item.stats.images} image${
            props.item.stats.images > 1 ? "s" : ""
          }, ${readingTime(props.item.stats)} min read`}
        >
          {readType(props.item.stats.images, readingTime(props.item.stats))}
        </ReadType>
      )}

      {props.item.type !== "placeholder" &&
        props.private &&
        ` ↝ ${STATUS[props.item.status]}`}
    </Stats>
  );
};
