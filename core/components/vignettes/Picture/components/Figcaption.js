import React from "react";
import styled, { css } from "styled-components";

import {
  b_laptop,
  b_mobile,
  b_movie,
  b_phablet,
  b_tablet,
  m_column,
  m_column_lg,
} from "../../../../../constants/styles/measurements";
import {
  c_black,
  c_white,
  c_yellow,
} from "../../../../../constants/styles/colors";
import Caption from "../../Caption";

const captionBlock = css`
  @media (min-width: ${b_laptop}) {
    margin: 0 auto;
  }
  @media (min-width: ${b_mobile}) {
    max-width: ${m_column};
  }
  @media (min-width: ${b_movie}) {
    max-width: ${m_column_lg}px;
  }
`;
const Figcaption = styled(Caption)`
  ${props =>
    !props.feature &&
    `
    background: ${c_white};
    .focus & {
      box-shadow: 0 8px 0 ${c_yellow} inset;
    }
  `}
  border-bottom: 8px solid ${c_black};
  padding: ${1.5 / 2}em ${1.5 / 0.8}em ${1.5 * 1.25}em;

  max-width: ${m_column};
  margin: 0 auto;

  div,
  textarea {
    display: inline;
  }
  textarea {
    font-size: 1em !important;
    overflow: hidden;

    text-align: right !important;
    @media (max-width: ${b_laptop}){
      text-align: center !important;
    }
  }

  text-align: right;
  @media (max-width: ${b_laptop}){
    text-align: center;
  }

  ${props =>
    props.feature &&
    `
      text-align: center;
      textarea {
        text-align: center !important;
      }
      ${captionBlock}
    `};

`;

export default props => {
  return (
    <figcaption
      style={
        props.nocaption ||
        (props.readOnly && !props.caption) ||
        (!props.readOnly &&
          !props.caption &&
          !props.focus &&
          !props.captionInputFocus)
          ? {
              borderBottom: "8px solid #2c2c2c",
              height: 0,
              overflow: "hidden",
            }
          : null
      }
    >
      <Figcaption feature={props.feature}>{props.children}</Figcaption>
    </figcaption>
  );
};
