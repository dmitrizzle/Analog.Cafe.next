import React from "react";
import styled from "styled-components";

import { c_grey_dark } from "../../../../../constants/styles/colors";
import { dateFromUnix } from "../../../../../utils/time";

export const TimeStamp = styled.small`
  display: block;
  text-align: center;
  font-style: italic;
  clear: both;
  margin: 3em auto;
  color: ${c_grey_dark};
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
      Published on <time>{datePublished.human}</time>.
      {dateModified && (
        <>
          {" "}
          Edited on <time>{dateModified.human}</time>.
        </>
      )}
    </TimeStamp>
  );
};
