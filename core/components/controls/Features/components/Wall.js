import styled, { css } from "styled-components";

export default styled.div`
  /* this allows better position for scrollbars */
  height: 8em;
  transition: height 250ms;

  padding-top: 8px;
  padding-bottom: 0.75em;
  margin-bottom: -2.5em;

  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translateZ(0);

  ${props =>
    props.withinArticle &&
    css`
      margin: 0 auto 2.5em;
      padding-left: 1em;
      padding-top: calc(8px + 0.75em);
      padding-bottom: 0;
    `}
`;

export const unstyledLinks = css`
  a {
    text-decoration: none;
  }
  a:active,
  a:focus {
    background: 0 0;
  }
`;
