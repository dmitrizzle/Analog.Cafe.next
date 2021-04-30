import styled from "styled-components";

export const ClampedSummary = styled.em`
  display: -webkit-box;
  max-height: 6em;
  overflow: hidden;
  opacity: 0.5;

  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const ClampedSubtitle = styled.em`
  display: -webkit-box;
  overflow: hidden;

  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;
