import styled, { keyframes } from "styled-components";

import {
  c_black,
  c_red,
  c_white,
} from "../../../../../constants/styles/colors";
import { m_radius } from "../../../../../constants/styles/measurements";
import { title } from "../../../../../constants/styles/typography";

export default styled.div`
  position: fixed;
  z-index: 11;
  top: 0;
  right: 0;
  padding: ${1 / 4}em ${1 / 2}em ${1 / 3}em ${1 / 2}em;
  ${title}
  font-size: .8em;
  background: ${props => (props.isInert ? c_white : c_red)};
  color: ${props => (props.isInert ? c_black : c_white)};
  border-bottom-left-radius: ${m_radius};

  width: 9em;
  transition: transform ${props => (!props.isInert ? "0" : ".5s 1s")},
    background 250ms;
  transform: translateY(${props => (props.isInert ? -2 : 0)}em);
`;

const jumpingLetters = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(15deg);
  }
  75% {
    transform: rotate(-15deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;
export const AnimatedCharacter = styled.span`
  display: inline-block;
  animation: ${jumpingLetters} ${props => props.order * 50 + 1000}ms linear
    ${props => props.order * 100}ms infinite;
`;
