import styled, { css } from "styled-components";

export default styled.div`
  /* this allows better position for scrollbars */
  height: 8em;
  transition: height 250ms;

  padding-bottom: 0.75em;
  padding-top: 1em;
  margin-bottom: -2.5em;

  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translateZ(0);

  ::-webkit-scrollbar {
    display: none;
  }

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
