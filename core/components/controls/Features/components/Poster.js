import React from "react";
import styled, { css } from "styled-components";

import {
  c_grey_med,
  c_red,
  c_white,
} from "../../../../../constants/styles/colors";
import { title } from "../../../../../constants/styles/typography";
import Link from "../../Link";

const Poster = styled(Link)`
  text-decoration: none !important;
  text-align: center;
  line-height: 1em;
  h4 {
    ${title};
    font-size: 0.7em;
  }

  width: 5em;
  height: 7em;

  margin-left: 1em;
  flex-shrink: 0;

  transform: translateZ(0);
  padding-top: 0.5em;

  &:first-child {
    /* margin-left: calc(50vw - 2.5em); */
    margin-left: 1.5em;
  }
  /* &:last-of-type {
    margin-right: calc(50vw - 4em);
  } */

  > div {
    /* transform: rotate(45deg); */
    width: 4em;
    height: 4em;
    border-radius: 4em;
    margin: 0 auto 1em;
    overflow: hidden;

    > div {
      width: 4em;
      height: 4em;
      /* margin-top: -1em;
      margin-left: -1em; */

      /* transform: rotate(-45deg); */
      background-size: cover !important;
      background-position: center !important;
    }

    ${props =>
      props.collection &&
      css`
        box-shadow: 0 0 0 1px ${c_white}, 0 0 0 2px ${c_grey_med};
      `};

    ${props =>
      props.active &&
      css`
        box-shadow: 0 0 0 1px ${c_white}, 0 0 0 2px ${c_red};
        background: ${c_white};
      `};
  }

  :active,
  :focus,
  .touch &:hover {
    h4 {
      color: ${c_red};
    }
    background: ${c_white};
  }
  ${props =>
    props.active &&
    css`
      h4 {
        color: ${c_red};
      }
    `};
`;
export default props => <Poster {...props} className="feature-poster" />;
export const Spacer = styled.div`
  height: 16em;
  width: 1.5em;
  flex-shrink: 0;
`;
