import { createGlobalStyle } from "styled-components";

import { c_black, c_yellow, c_transparent } from "./colors";

export const CssBody = createGlobalStyle`
  body {
    color: ${c_black};
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
  }
`;
