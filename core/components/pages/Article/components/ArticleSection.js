import styled, { css } from "styled-components";

import {
  b_mobile,
  b_movie,
  m_column,
  m_column_lg,
} from "../../../../../constants/styles/measurements";
import {
  c_grey_dark,
  c_grey_light,
  c_yellow,
} from "../../../../../constants/styles/colors";
import { styles } from "./ArticleQuote";
import { title } from "../../../../../constants/styles/typography";

export const sectionTitle = css`
  ${title}
  font-size: 2em;
  padding-top: 1em;
  margin-bottom: 0.25em;
  clear: both;
`;

const sectionParagraph = css`
  margin: 1em 0;
  ${props =>
    props.articleStatus === "loading"
      ? `color: ${c_grey_light}; letter-spacing: -1px !important;`
      : null};
`;
const sectionBreak = css`
  text-align: center;
  padding: 3em 0;
  color: ${c_grey_dark};
  border: 0;
  margin: 0;
  clear: both;
  &:before {
    content: "※";
    line-height: 1em;
    display: block;
  }
  &.focus {
    background-color: ${c_yellow};
  }
`;
export default styled.section`
  cursor: text;
  margin: 0 auto;
  max-width: ${m_column};

  ${"" /* @media (min-width: ${b_laptop}) {
    max-width: 800px;
  } */}

  @media (min-width: ${b_movie}) {
    max-width: ${m_column_lg};
  }
  padding: 0 1.5em;

  &::after {
    content: "";
    clear: both;
    display: block;
  }

  p {
    ${sectionParagraph};
  }
  ul {
    margin: 0 1.5em 0;
    @media (max-width: ${b_mobile}) {
      margin: 0 !important;
    }
    li {
      line-height: 1.5em;
      padding-bottom: 1em;
    }
  }
  blockquote {
    ${styles};
  }
  h2,
  h3,
  h4 {
    ${sectionTitle};
  }
  hr {
    ${sectionBreak};
  }
`;

export const UnorderedList = styled.ul`
  list-style: disc;
  li {
    padding: 0 !important;
  }
`;
