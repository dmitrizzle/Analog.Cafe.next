import styled, { keyframes, css } from "styled-components";

import { title } from "../../../../../constants/styles/typography";

// const animationTitleFlip = keyframes`
//   from { transform: perspective(10em) rotateX(-90deg)}
//   to { transform:perspective(400px) rotateX(0deg) }
// `;
export const headerTitleStyles = css`
  ${title}
  font-size:  3em;
  hyphens: auto;
  min-height: 1em;

  /* animation: ${animationTitleFlip} 250ms cubic-bezier(0.46, 0.88, 0.37, 1.43);
  ${props =>
    props.isLoading &&
    css`
      animation: none;
    `} */
`;
export default styled.h1`
  ${headerTitleStyles}
`;
