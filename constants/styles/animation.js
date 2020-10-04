import { keyframes } from "styled-components";

export const fadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`;

export const notificationShow = keyframes`
  0% {
    transform: scale(0,0);
  }
  44% {
    transform: scale(1,0.025);
  }
  66% {
    transform: scale(1.15,1.15);
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
    transform: scale(1,0.025);
  }
  90% {
    transform: scale(0.0025,0.025);
  }
  100% {
    transform: scale(0,0);
  }
`;
