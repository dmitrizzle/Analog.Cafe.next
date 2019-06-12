import styled, { keyframes, css } from "styled-components";

import {
  c_black,
  c_grey_light,
  c_red,
  c_white,
} from "../../../../../constants/styles/colors";
import { m_radius } from "../../../../../constants/styles/measurements";
import { title } from "../../../../../constants/styles/typography";

const progress = keyframes`
  0% { width: 10%; transform: translate3d(0, 0, 0); }
  100% { width: 99%; transform: translate3d(0, 0, 0);}
`;

export const AnimatedProgress = styled.div`
  height: 2px;
  position: fixed;
  z-index: 21;
  top: 0;
  left: 0;

  animation: ${props =>
    props.isInert
      ? "none"
      : css`
          ${progress} 10s cubic-bezier(0, 0.9, 0.75, 1) forwards;
        `};
  width: ${props => (props.isInert ? "100%" : "10%")};

  background: ${props => (props.isInert ? c_white : c_red)};
  transition: background ${props => (props.isInert ? 0.75 : 0)}s, width 150ms;
`;
//
// export default styled.div`
//   position: fixed;
//   z-index: 22;
//   top: 0;
//   left: 0;
//   padding: ${1 / 4}em ${1 / 2}em ${1 / 3}em ${1 / 2}em;
//   ${title}
//   font-size: .8em;
//
//   background: ${props => (props.isInert ? c_grey_light : c_red)};
//   color: ${props => (props.isInert ? c_black : c_white)};
//   border-bottom-right-radius: ${m_radius};
//   cursor: pointer;
//   text-align: center;
//
//   width: 9em;
//   transition: transform
//     ${props =>
//       !props.isInert
//         ? "80ms 50ms"
//         : ".5s 1s, background 250ms 150ms, color 250ms"};
//   transform: translateY(${props => (props.isInert ? -2 : 0)}em);
// `;
//
// const jumpingLetters = keyframes`
//   0% {
//     transform: rotate(0deg);
//   }
//   25% {
//     transform: rotate(15deg);
//   }
//   75% {
//     transform: rotate(-15deg);
//   }
//   100% {
//     transform: rotate(0deg);
//   }
// `;
// export const AnimatedCharacter = styled.span`
//   display: inline-block;
//   animation: ${jumpingLetters} ${props => props.order * 50 + 1000}ms linear
//     ${props => props.order * 100}ms infinite;
// `;
