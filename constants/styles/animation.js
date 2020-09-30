import { keyframes } from "styled-components";

export const fadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`;

export const notificationShow = keyframes`
  0% {
    transform: scale(0,0);
  }
  10% {
    transform: scale(0.0025,0.05);
  }
  75% {
    transform: scale(1,0.01);
  }
  100% {
    transform: scale(1,1);
  }
`;
export const notificationDismiss = keyframes`
  0% {
    transform: scale(1,1);
  }
  75% {
    transform: scale(1,0.01);
  }
  90% {
    transform: scale(0.0025,0.05);
  }
  100% {
    transform: scale(0,0);
  }
`;
