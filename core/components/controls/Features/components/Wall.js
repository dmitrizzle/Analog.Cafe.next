import styled, { css } from "styled-components";

export default styled.div`
  /* this allows better position for scrollbars */
  height: 8em;
  transition: height 250ms;

  padding-top: 3em;
  padding-bottom: 0.75em;

  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translateZ(0);
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
