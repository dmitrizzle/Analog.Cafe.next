import React from "react";
import styled from "styled-components";

import { c_grey_dark } from "../../../../../constants/styles/colors";
import { b_mobile } from "../../../../../constants/styles/measurements";
import { dateFromUnix } from "../../../../../utils/time";

export const TimeStamp = styled.small`
  display: block;
  text-align: center;
  font-style: italic;
  clear: both;
  margin: 3em auto;
  color: ${c_grey_dark};
  max-width: ${b_mobile};
`;

export default props => {
  const dateModified =
    props.thisArticleEditDate &&
    props.thisArticleEditDate !== props.thisArticlePostDate
      ? dateFromUnix(props.thisArticleEditDate)
      : null;
  const datePublished = dateFromUnix(props.thisArticlePostDate);
  return (
    <TimeStamp>
      Published on{" "}
      <time dateTime={datePublished.iso}>{datePublished.human}</time>.
      {dateModified && (
        <>
          <br />
          Edited on{" "}
          <time dateTime={dateModified.iso}>{dateModified.human}</time>.
        </>
      )}
    </TimeStamp>
  );
};
