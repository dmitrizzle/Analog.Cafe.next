import styled, { keyframes, css } from "styled-components";

import {
  c_black,
  c_grey_light,
  c_yellow
} from "../../../../../constants/styles/colors";

const loadingLinks = keyframes`
  from { background: ${c_yellow}; }
    to { background: ${c_grey_light}; }
`;

export default styled.a`
  :active,
  :focus {
    ${props =>
      !props.skipAnimation &&
      css`
        background: ${c_yellow};
        color: ${c_black};
        animation: ${loadingLinks} 500ms infinite alternate;
      `};
  }
`;
