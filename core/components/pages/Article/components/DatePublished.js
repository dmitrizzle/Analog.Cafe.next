import React from "react";
import styled from "styled-components";

import { b_mobile } from "../../../../../constants/styles/measurements";
import { dateFromUnix } from "../../../../../utils/time";

export const TimeStamp = styled.small`
  display: block;
  text-align: center;
  font-style: italic;
  clear: both;
  margin: 3em auto 0;
  color: ${({ theme }) => theme.grey_dark};
  max-width: ${b_mobile};
`;

const DatePublished = props => {
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
          Updated on{" "}
          <time dateTime={dateModified.iso}>{dateModified.human}</time>.
        </>
      )}
    </TimeStamp>
  );
};

export default DatePublished;
