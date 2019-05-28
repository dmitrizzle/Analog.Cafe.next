import { createGlobalStyle } from "styled-components";

import { b_laptop, b_mobile, b_movie, b_tablet } from "./measurements";
import { c_black, c_transparent, c_yellow } from "./colors";
import { paragraph } from "./typography";

export const CssBody = createGlobalStyle`
  body {

    color: ${c_black};
    line-height: 1.15;

    a {
      color: inherit;
      &:active {
        background: ${c_yellow};
        color: ${c_black};
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

    @media (min-width: ${b_movie}) {
      font-size: 23px;
    }
    @media (min-width: ${b_laptop}) {
      font-size: 20px;
    }
    @media (min-width: ${b_tablet}) {
      font-size: 18px;
    }
    @media (min-width: ${b_mobile}) {
      font-size: 17px;
    }
    ${paragraph}

  }
`;
