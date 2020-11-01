import styled, { keyframes } from "styled-components";

const animationUnfold = keyframes`
  from {  opacity: 0  }
  to {  opacity; 1  }
`;
export const ModalAdWrapper = styled.div`
  > div {
    margin: 1em auto 1em;
    transform: translateZ(0);

    animation-fill-mode: forwards;
    animation: ${animationUnfold} 250ms;
  }
`;
