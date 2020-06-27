import React from "react";
import Router from "next/router";
import styled, { css } from "styled-components";

import {
  c_grey_light,
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

  figure {
    width: 4em;
    height: 4em;
    border-radius: 4em;
    margin: 0 auto 1em;
    overflow: hidden;
    background: ${c_white};

    > div {
      width: 7em;
      filter: saturate(0);
      opacity: 0.75;
      img {
        width: 100%;
        margin-left: -5.5em;
      }
      svg {
        width: 1.5em;
        margin: 1.375em;
        display: block;
      }
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
        > div {
          filter: saturate(1);
          opacity: 1;
        }
      `};
  }

  :active,
  :focus,
  .touch &:hover {
    h4 {
      color: ${c_red};
    }
    background: ${c_white};
    > div > div {
      filter: saturate(1);
      opacity: 1;
    }
    figure {
      box-shadow: 0 0 0 1px ${c_white}, 0 0 0 2px ${c_red};
    }
  }
  ${props =>
    props.active &&
    css`
      h4 {
        color: ${c_red};
      }
    `};

  &#poster-bookmarks {
    figure {
      background: ${c_grey_light};
    }
  }
`;
export default props => (
  <Poster
    className="feature-poster"
    onClick={event => {
      if (!props.collection && !props.tag && props.to) {
        event.preventDefault();
        const delayRouteChange = setTimeout(() => {
          clearTimeout(delayRouteChange);
          Router.router.push(props.to);
        }, 150);
      }
    }}
    {...props}
  />
);
export const Spacer = styled.div`
  height: 16em;
  width: 1.5em;
  flex-shrink: 0;
`;
