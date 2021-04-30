import styled, { css } from "styled-components";

const clamp = css`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const ClampedSummary = styled.em`
  display: block;
  overflow: hidden;
  max-height: 6em;
  opacity: 0.75;

  ${clamp};
`;

export const ClampedSubtitle = styled.h4`
  display: block;
  overflow: hidden;
  max-height: 3em;

  margin-bottom: 1.25em !important;
  padding: 0 !important;

  font-variation-settings: "wght" 500 !important;
  font-weight: 500 !important;

  ${clamp};
  -webkit-line-clamp: 1;
`;

export const ClampedByline = styled.em`
  display: block;
  overflow: hidden;
  max-height: 1.5em;

  margin-top: 0.75em;

  ${clamp};
  -webkit-line-clamp: 1;
`;
