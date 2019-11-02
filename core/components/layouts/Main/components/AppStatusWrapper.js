import styled, { keyframes, css } from "styled-components";

import { c_red } from "../../../../../constants/styles/colors";

const progress = keyframes`
  0% { transform: scale(0,1) rotateZ(360deg) }
  100% { transform: scale(.99,1) rotateZ(360deg);}
`;

export const AnimatedProgress = styled.div`
  height: 4px;
  position: fixed;
  z-index: 21;
  top: 0;
  left: 0;
  width: 100%;

  animation: ${props =>
    css`
      ${progress} 10s cubic-bezier(0, 0.9, 0.75, 1) forwards;
    `};
  transform: scale(0, 1) rotateZ(360deg);

  background: ${c_red};
  transition: width 150ms;
`;
