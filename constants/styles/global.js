import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import { b_laptop, b_mobile, b_movie, b_tablet } from "./measurements";
import { c_black, c_transparent, c_white, c_yellow } from "./colors";
import { paragraph } from "./typography";

export const BLANK_DOT_URI =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

export const CssBody = createGlobalStyle`
  ${reset}

  body {
    color: ${c_black};
    background: ${c_white};

    line-height: 1.15;


    a {
      color: inherit;

      &:active {
        background: ${c_yellow};
      }

      text-decoration-skip: ink;
      -webkit-text-decoration-skip: ink;
    }

    *::selection {
      background: ${c_yellow};
    }
    a,
    button,
    textarea {
      -webkit-tap-highlight-color: ${c_transparent};
      &:focus { outline: none; }
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
    strong, b { font-weight: 700; }

    h1, h2, h3, h4 { font-weight: 600; }

    small {
      font-size: .8em;
      line-height: 1.5em;
    }

    ${paragraph}

  }
`;
