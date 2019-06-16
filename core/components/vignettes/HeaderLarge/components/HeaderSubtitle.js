import styled, { css, keyframes } from "styled-components";

import { title } from "../../../../../constants/styles/typography";

const animationSubtitleFlip = keyframes`
  from { transform: perspective(10em) rotateX(-90deg)}
  to { transform:perspective(400px) rotateX(0deg) }
`;

export const subtitleStyles = css`
  ${title}
  font-size: 1.15em;
`;

export default styled.h2`
  ${subtitleStyles};
  animation: ${animationSubtitleFlip} 550ms 100ms
    cubic-bezier(0.46, 0.88, 0.37, 1.43);
  ${props =>
    props.isLoading &&
    css`
      animation: none;
    `}
`;

// const [count, setCount] = useState(0);
