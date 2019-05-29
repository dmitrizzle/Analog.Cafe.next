import { createGlobalStyle, keyframes } from "styled-components";

import { b_laptop, b_mobile, b_movie, b_tablet } from "./measurements";
import { c_black, c_red, c_transparent, c_yellow } from "./colors";
import { paragraph } from "./typography";

const loadingLinks = keyframes`
  from { background: ${c_red}; }
  to { background: ${c_yellow};}
`;

export const CssBody = createGlobalStyle`
  body {

    color: ${c_black};
    line-height: 1.15;

    a {
      color: inherit;
      &:active, &:focus {
        background: ${c_red};
        animation: ${loadingLinks} 500ms infinite alternate;
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
