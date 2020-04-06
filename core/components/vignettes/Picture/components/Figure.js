import React from "react";
import styled, { css } from "styled-components";

import {
  b_laptop,
  b_mobile,
  b_movie,
  b_phablet,
  m_column,
  m_column_lg,
} from "../../../../../constants/styles/measurements";
import {
  c_black,
  c_white,
  c_yellow,
} from "../../../../../constants/styles/colors";
import { styles } from "../../Caption";
import Figcaption from "./Figcaption";
import ImageSet from "./ImageSet";

export const bleed = css`
  float: none;
  margin-left: -1.5em;
  margin-right: -1.5em;
  margin-bottom: 0;
  margin-top: 0;
  width: 100vw !important;
  max-width: 100vw !important;
  box-shadow: none;

  @media (min-width: 816px) {
    ${props =>
      props.feature && `margin-left:	calc(( -100vw + ${m_column} )/2 )`};
  }

  @media (min-width: ${b_laptop}) {
    margin-top: 1em;
    ${props =>
      props.feature && `margin-left:	calc(( -100vw + ${m_column} )/2 )`};
  }
  @media (min-width: ${b_movie}) {
    ${props =>
      props.feature && `margin-left:	calc(( -100vw + ${m_column_lg} )/2)`};
  }
`;
const shadow = css`
  /* box-shadow: 0 0 0.5em rgba(44, 44, 44, 0.125); */
`;
const Figure = styled.figure`
  cursor: pointer;
  overflow: hidden;
  position: relative;
  padding: 0;
  margin: 1.25em
    1em
    1em calc(-${m_column} / 4);
  z-index: 10;
  width: 85%;
  float: left;
  background: ${c_white};
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  ${shadow}

  @media (min-width: ${b_movie}) {
		width: 				95%;
		margin-left: 	calc(${m_column_lg} / -2.75);
		margin-right: 1em;
	}
  @media (min-width: 2550px) {
		margin-left: 	calc(-${m_column_lg} - 1em);
    ${props =>
      props.feature
        ? `
        max-width: calc(2550px - 1.5em) !important;
        padding-left: calc((100vw - 2550px + 1.5em)/2);
    `
        : `
    figcaption, figcaption > div { border-bottom: none !important; }
    border-right: 1px solid ${c_black}
    `}


	}

  @media (max-width: ${b_laptop}) {
    ${props =>
      !props.feature &&
      `
      float: none;
      margin: 1.5em auto !important;
      width: 100% ;
      max-width: ${b_phablet};
      &.focus {
        overflow: visible;

      }
    `}
  }
  @media (max-width: ${b_phablet}) {
    ${props =>
      !props.feature &&
      `
      width: 100% ;
      max-width: 100% ;`}
  }


  ${props =>
    props.feature
      ? bleed
      : `
    @media (max-width: ${b_mobile}) {
  		margin-left: 0 !important;
    }
	`}

  ${props => props.feature && bleed}

   &.focus {
    box-shadow: 0 -1px 0 ${c_yellow};
    figcaption { box-shadow: 0 1px 0 ${c_yellow} inset; }
    z-index: 11;
  }
  textarea {
    ${styles};
    font-size: inherit !important;
  }


   ${props =>
     props.feature &&
     !props.caption &&
     props.foldSpacer &&
     `@media (min-width: ${b_laptop}) {margin-bottom: -1em;}`}


`;

export default props => {
  // eslint-disable-next-line
  const { src, ...select } = props;

  return (
    <Figure {...select}>
      <ImageSet
        {...props}
        protected={
          props.readOnly !== false &&
          (process.env.NODE_ENV === "production" || props.userRole === "admin")
        }
      />
      {props.wrapper && props.children}
      <Figcaption
        caption={props.caption}
        nocaption={props.nocaption}
        readOnly={props.readOnly}
        focus={props.focus}
        feature={props.feature}
        captionInputFocus={props.captionInputFocus}
      >
        {props.children}
      </Figcaption>
    </Figure>
  );
};
