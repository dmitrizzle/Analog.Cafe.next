import React from "react";
import styled, { css } from "styled-components";

import {
  b_laptop,
  b_mobile,
  b_movie,
  b_tablet,
  m_column,
  m_column_lg,
  m_radius_sm,
} from "../../../../../constants/styles/measurements";
import {
  c_black,
  c_grey_light,
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
  border-radius: 0;

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
  box-shadow: 0 0 0.5em rgba(44, 44, 44, 0.125);
`;
const Figure = styled.figure`
  cursor: pointer;
  overflow: hidden;
  position: relative;
  padding: 0;
  margin: .5em
    1em
    1em calc(-${m_column} / 4);
  z-index: 10;
  width: 85%;
  float: left;
  background: ${c_black};
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  ${shadow}

  @media (min-width: ${b_movie}) {
		width: 				95%;
		margin-left: 	-calc(${m_column_lg} / 2.75);
		margin-right: 1em;
	}
  @media (max-width: ${b_laptop}) {
    ${props =>
      !props.feature &&
      `
      float: none;
      margin: .5em 0 1.5em  -1.5em !important;
      width: 75% !important;
      max-width: 66vw !important;
      min-width: ${b_mobile};
      &.focus {
        overflow: visible;
        &::after {
          content: "";
          width: 100vw;
          position: absolute;
          top: 0;
          bottom: 0;
          background:
              ${c_grey_light};
          z-index: -1;
        }
      }
    `}
  }

  ${props =>
    props.feature
      ? bleed
      : `
    @media (max-width: ${b_laptop}) {
  		margin-left: 0 !important;
  		border-radius:	${m_radius_sm};
    }
	`}

  ${props =>
    props.feature
      ? bleed
      : props => `
      @media (max-width: 388px) {
    		${bleed}
    		width: 100% !important;
    		max-width: 100vw !important;
    		min-width: 0;
    		border-radius:	${m_radius_sm};
    		${shadow}
      }
	`}

   &.focus {
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    box-shadow: 0 -8px 0 ${c_yellow};
    figcaption { box-shadow: 0 8px 0 ${c_yellow} inset; }
    z-index: 11;
  }
  textarea {
    ${styles};
    font-size: inherit !important;
  }

  @media (min-width: ${b_laptop}) {
  ${props =>
    props.feature &&
    !props.caption &&
    props.foldSpacer &&
    `margin-bottom: -1em;`}
  }

`;

export default props => {
  const { src, ...select } = props;
  console.log(props.foldSpacer);
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
        captionInputFocus={props.captionInputFocus}
      >
        {props.children}
      </Figcaption>
    </Figure>
  );
};
