import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import { b_laptop, b_mobile, b_movie, b_tablet } from "./measurements";
import { paragraph, variableFontWeight } from "./typography";

export const BLANK_DOT_URI =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

export const CssBody = createGlobalStyle`
  ${reset}

  body {
    color: ${({ theme }) => theme.fg};
    background: ${({ theme }) => theme.bg};
    transition: background 250ms;
    line-height: 1.15;

    a {
      color: inherit;
      &:active {
        background: ${({ theme }) => theme.highlight};
      }
      text-decoration-skip: ink;
      -webkit-text-decoration-skip: ink;
    }
    *::selection {
      background: ${({ theme }) => theme.highlight};
    }
    a,
    button,
    textarea {
      -webkit-tap-highlight-color: transparent;
      &:focus { outline: none; }
    }
    textarea, input {
      background: ${({ theme }) => theme.bg};
      transition: background 250ms;
      color: ${({ theme }) => theme.heading};
    }

    svg {
      fill: currentColor;
      vertical-align: middle;
    }

    @media (min-width: ${b_mobile}) {
      font-size: 17px;
    }
    @media (min-width: ${b_tablet}) {
      font-size: 18px;
    }
    @media (min-width: ${b_laptop}) {
      font-size: 20px;
    }
    @media (min-width: ${b_movie}) {
      font-size: 23px;
    }
    em, i { font-style: italic; }
    strong, b { ${variableFontWeight(700)} }
    h1, h2, h3, h4 {
      ${variableFontWeight(600)};
      color: ${({ theme }) => theme.heading};
    }
    small {
      font-size: .8em;
      line-height: 1.5em;
    }
    ${paragraph}
  }
`;
