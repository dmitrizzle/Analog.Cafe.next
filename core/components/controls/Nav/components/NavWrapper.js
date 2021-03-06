import styled, { keyframes, css } from "styled-components";

import { m_column } from "../../../../../constants/styles/measurements";

const animationNavTransition = keyframes`
  0% { opacity: 0}
  100% { opacity: 1}
`;

export default styled.nav`
  @media print {
    display: none;
  }

  ${props =>
    props.shouldAnimateFade &&
    css`
      opacity: 0;
      animation: ${animationNavTransition} 500ms ease forwards;
    `}

  margin: 2.66em 0 .5em;
  padding: 0 0.5em;
  position: relative;
  z-index: 20;

  ul {
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    color: ${({ theme }) => theme.fg};
    max-width: ${m_column};
  }

  a {
    color: inherit;
    text-decoration-skip: ink;
    text-decoration: none;
    position: relative;
    background: ${({ theme }) => theme.bg};
    padding: 0.1em 0.45em 0.15em;
    border-radius: 0.25em;
  }
`;
