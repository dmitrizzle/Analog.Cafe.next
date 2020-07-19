import styled from "styled-components";

import { title } from "../../../../constants/styles/typography";

export default styled.header`
  z-index: 10;
  display: flex;
  justify-content: space-between;
  position: relative;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.grey_med};
  line-height: 1.75em;
  padding: 0.1em 0.5em;
  margin-bottom: 1px;

  h3,
  input {
    ${title};
    color: ${({ blue, theme }) => blue && theme.bg};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    padding: 0;
  }
  h3::before,
  ${props =>
      !props.noStar &&
      `input::before {
    content: "❐ ";
  }`}
    a {
    text-decoration: none;
  }
  a:active {
    background: transparent;
    color: ${({ theme }) => theme.brand};
  }
`;
