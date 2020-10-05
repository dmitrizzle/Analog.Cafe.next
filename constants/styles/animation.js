import { keyframes } from "styled-components";

export const fadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`;

export const notificationShow = keyframes`
  0% {
    transform: scale(0,0) translateZ(0);
  }
  5% {
    transform: scale(0.0025,0.05) translateZ(0);
  }
  50% {
    transform: scale(1,0.05) translateZ(0);
  }
  70% {
    transform: scale(1.05,1.05) translateZ(0);
  }
  100% {
    transform: scale(1,1) translateZ(0);
  }
`;
export const notificationDismiss = keyframes`
  0% {
    transform: scale(1,1) translateZ(0);
  }
  30% {
    transform: scale(1,0.05) translateZ(0);
  }
  95% {
    transform: scale(0.005,0.05) translateZ(0);
  }
  100% {
    transform: scale(0,0) translateZ(0);
  }
`;
