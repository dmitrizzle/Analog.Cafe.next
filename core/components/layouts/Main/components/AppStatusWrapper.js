import styled, { keyframes } from "styled-components";

import { c_red, c_white } from "../../../../../constants/styles/colors";
import { m_radius } from "../../../../../constants/styles/measurements";
import { title } from "../../../../../constants/styles/typography";

export default styled.div`
  position: fixed;
  top: 0;
  right: 0;
  padding: ${1 / 4}em ${1 / 2}em ${1 / 3}em ${1 / 2}em;
  ${title}
  font-size: .8em;
  background: ${c_red};
  color: ${c_white};
  border-bottom-left-radius: ${m_radius};
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
