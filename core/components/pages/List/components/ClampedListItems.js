import styled from "styled-components";

export const ClampedSummary = styled.em`
  display: -webkit-box;
  max-height: 6em;
  overflow: hidden;

  opacity: 0.75;

  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;

export const ClampedSubtitle = styled.h4`
  display: -webkit-box;
  margin-bottom: 1em !important;
  overflow: hidden;

  padding: 0 !important;
  font-variation-settings: "wght" 500 !important;
  font-weight: 500 !important;

  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;
