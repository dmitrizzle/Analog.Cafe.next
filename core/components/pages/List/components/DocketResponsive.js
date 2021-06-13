import React from "react";
import styled, { css } from "styled-components";

import {
  b_laptop,
  b_phablet,
  b_tablet,
  m_radius,
} from "../../../../../constants/styles/measurements";
import { makeFroth } from "../../../../../utils/froth";
import Docket, { DocketInfo } from "../../../controls/Docket";
import Leader from "../../../icons/Leader";
import Lines from "../../../icons/Lines";

const LeaderSVG = encodeURIComponent(renderToStaticMarkup(<Leader />));
const LeaderDataUri = `url("data:image/svg+xml,${LeaderSVG}")`;
const LinesSVG = encodeURIComponent(renderToStaticMarkup(<Lines />));
const LinesDataUri = `url("data:image/svg+xml,${LinesSVG}")`;

import { renderToStaticMarkup } from "react-dom/server";

export const DocketResponsive = styled(Docket)`
  margin: 0;
  width: 100%;
  transform: translateZ(0);
  background: ${({ theme }) => theme.grey_light};
  overflow: visible;
  height: 11em;

  @media (max-width: ${b_phablet}) {
    background: ${({ theme }) => theme.bg};

    height: auto;
    padding-bottom: 1.5em;
  }
  .lazyload-placeholder {
    margin-bottom: -2em;
  }

  :active,
  :focus {
    background: ${({ theme }) => theme.fg};
    @media (max-width: ${b_phablet}) {
      background: ${({ theme }) => theme.highlight};
    }
  }
`;
const Wrapper = styled.div`
  mask-image: ${props => (props.tag === "link" ? LinesDataUri : LeaderDataUri)};
  mask-size: 14em 9em;

  position: absolute;
  width: 14em;
  height: 9em;
  top: 1em;
  left: -4em;
  bottom: 0;

  background: ${({ theme }) => theme.grey_med};

  /* fill image */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  img {
    flex-shrink: 0;
    min-width: 100%;
    min-height: 100%;
    width: 120%;
    height: auto;
    filter: brightness(0.9);
  }

  @media (max-width: ${b_phablet}) {
    mask-size: 14em 7em;
    height: 8em;
    top: 1em;
  }

  ${props =>
    props.tag === "link" &&
    css`
      mask-size: 14em 8.5em;
      @media (max-width: ${b_laptop}) {
        mask-size: 14em 9.5em;
        height: 9.5em;
        top: 0.75em;
      }
      @media (max-width: ${b_tablet}) {
        mask-size: 14em 8em;
        height: 9em;
        top: 1em;
      }
    `};

  mask-repeat: no-repeat;
  mask-origin: stroke-box;
  mask-position: top right;

  .no-touch a:active &,
  .no-touch a:focus & {
    filter: invert(1);
  }

  @media (max-width: ${b_phablet}) {
    transform: rotate(0);
    top: 0.5em;
    left: 0em;
    float: right;
    margin-bottom: -1.5em;
    position: relative;
  }
`;
export const DocketResponsiveImage = props => (
  <Wrapper {...props}>
    <picture>
      <source
        srcSet={
          makeFroth({
            src: props.src,
            size: "s",
            type: "avif",
          }).src
        }
        media="(min-width: 320px)"
        type="image/avif"
      />
      <source
        srcSet={
          makeFroth({
            src: props.src,
            size: "s",
            type: "webp",
          }).src
        }
        media="(min-width: 320px)"
        type="image/webp"
      />
      <source
        srcSet={
          makeFroth({
            src: props.src,
            size: "s",
          }).src
        }
        media="(min-width: 320px)"
      />

      <source
        srcSet={
          makeFroth({
            src: props.src,
            size: "t",
            type: "avif",
          }).src
        }
        media="(max-width: 319px)"
        type="image/avif"
      />
      <source
        srcSet={
          makeFroth({
            src: props.src,
            size: "t",
            type: "webp",
          }).src
        }
        media="(max-width: 319px)"
        type="image/webp"
      />

      {/* default */}
      <img
        src={
          makeFroth({
            src: props.src,
            size: "t",
          }).src
        }
        alt={props.alt}
        loading="lazy"
      />
    </picture>
  </Wrapper>
);

export const DocketResponsiveInfo = styled(DocketInfo)`
  left: 7.5em;
  padding-left: 1em;
  padding-right: 1em;
  right: 0;
  border-radius: 0 ${m_radius} ${m_radius} 0;
  background: ${({ theme }) => theme.bg};
  box-shadow: -1px 0px 0 0 ${({ theme }) => theme.grey_med};
  a:active &,
  a:focus & {
    background: ${({ theme }) => theme.highlight};
  }

  @media (max-width: ${b_phablet}) {
    border-radius: ${m_radius};
    background: 0 0 !important;
    box-shadow: none;
    width: calc(100% - 1.5em);
    max-width: 420px;
    padding: 0 0.5em 0.5em 1em;
    left: 0;
    right: 0;
    position: relative;

    h4 {
      max-width: 40vw;
    }
  }
`;
