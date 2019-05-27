import { createGlobalStyle } from "styled-components";

import { c_black, c_yellow, c_transparent } from "./colors";
import { paragraph } from "./typography";
import {
  screen_huge_min,
  screen_laptop_min,
  screen_mobile_max,
  screen_tablet_max
} from "./measurements";

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

    @media (${screen_huge_min}) {
      font-size: 23px;
    }
    @media (${screen_laptop_min}) {
      font-size: 20px;
    }
    @media (${screen_tablet_max}) {
      font-size: 18px;
    }
    @media (${screen_mobile_max}) {
      font-size: 17px;
    }
    ${paragraph}

  }
`;
