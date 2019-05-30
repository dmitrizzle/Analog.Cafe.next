import styled, { keyframes, css } from "styled-components";

import {
  c_black,
  c_grey_light,
  c_yellow
} from "../../../../../constants/styles/colors";

const loadingLinks = keyframes`
  from { background: ${c_yellow}; color: ${c_black};}
    to { background: ${c_grey_light}; color: ${c_black};}
`;

export default styled.a`
  :active,
  :focus {
    ${props =>
      !props.skipAnimation &&
      css`
        background: ${c_yellow};

        animation: ${loadingLinks} 500ms infinite alternate;
      `};
  }
`;
