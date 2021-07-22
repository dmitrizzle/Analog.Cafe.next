import React from "react";
import Router from "next/router";
import styled, { css } from "styled-components";

import { m_radius_sm } from "../../../../../constants/styles/measurements";
import { title } from "../../../../../constants/styles/typography";
import Link from "../../Link";

const thinHeaderCSS = css`
  ${title};
  font-size: 0.7em;
  font-variation-settings: "wght" 400 !important;
`;

export const ThinHeader = styled.h4`
  ${thinHeaderCSS}
`;

const Poster = styled(Link)`
  text-decoration: none !important;
  text-align: center;
  line-height: 1em;
  h4 {
    ${thinHeaderCSS}
  }

  width: 5em;
  height: 7em;

  flex-shrink: 0;

  transform: translateZ(0);
  padding-top: 0.5em;

  border-radius: ${m_radius_sm};

  &:first-child {
    /* margin-left: calc(50vw - 2.5em); */
    margin-left: 1.5em;
  }
  /* &:last-of-type {
    margin-right: calc(50vw - 4em);
  } */

  figure {
    width: 2.75em;
    height: 2.75em;
    border-radius: ${m_radius_sm};
    margin: 0 auto 1em;
    overflow: hidden;
    background: ${({ theme }) => theme.bg};

    > div {
      width: 5em;
      filter: saturate(0);
      img {
        width: 100%;
        margin-left: -3.5em;
      }
    }
    ${({ collection }) =>
      collection &&
      css`
        box-shadow: 0 0 0 1px ${({ theme }) => theme.bg};
      `};

    ${({ active }) =>
      active &&
      css`
        box-shadow: 0 0 0 1px ${({ theme }) => theme.bg},
          0 0 0 2.5px ${({ theme }) => theme.fg};
        background: ${({ theme }) => theme.bg};
        > div {
          filter: saturate(1);
        }
      `};
  }

  :active,
  :focus,
  .touch &:hover {
    h4 {
      color: ${({ theme }) => theme.fg};
    }
    background: ${({ theme }) => theme.bg};
    > div > div {
      filter: saturate(1);
    }
    figure {
      box-shadow: 0 0 0 1px ${({ theme }) => theme.bg},
        0 0 0 2.5px ${({ theme }) => theme.fg};
    }
  }
  ${props =>
    props.active &&
    css`
      h4 {
        color: ${({ theme }) => theme.fg};
      }
    `};

  &#poster-bookmark,
  &#poster-link,
  &#poster-editorial,
  &#poster-submission,
  &#poster-theme {
    figure {
      > div {
        filter: saturate(1);
      }
      background-color: ${({ theme }) => theme.grey_light};

      svg {
        width: 1em;
        margin: 0.75em;
        display: block;
        path {
          fill: ${({ theme }) => theme.fg};
        }
      }
    }
  }
`;

const PosterComponent = props => {
  // eslint-disable-next-line
  const { withinArticle, ...safeProps } = props;
  return (
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
      {...safeProps}
    />
  );
};

export default PosterComponent;
export const Spacer = styled.div`
  height: 16em;
  width: 1.5em;
  flex-shrink: 0;
`;
