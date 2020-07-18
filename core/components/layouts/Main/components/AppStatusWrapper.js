import styled, { keyframes, css } from "styled-components";

import { c_red } from "../../../../../constants/styles/colors";

const progress = keyframes`
  0% { transform: scale(0,1) rotateZ(360deg) }
  100% { transform: scale(.99,1) rotateZ(360deg);}
`;

export const AnimatedProgress = styled.div`
  height: 2px;
  position: fixed;
  z-index: 21;
  top: 0;
  left: 0;
  width: 100%;

  animation: ${props =>
    !props.isLoading
      ? "none"
      : css`
          ${progress} 10s cubic-bezier(0, 0.9, 0.75, 1) forwards;
        `};
  transform: scale(${({ isLoading }) => (!isLoading ? 1 : 0)}, 1)
    rotateZ(360deg);

  background: ${({ isLoading, theme }) => (!isLoading ? theme.bg_a0 : c_red)};
  transition: background ${props => (!props.isLoading ? 0.75 : 0)}s, width 150ms;
`;
