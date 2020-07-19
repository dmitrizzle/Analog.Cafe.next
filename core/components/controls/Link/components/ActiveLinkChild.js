import styled from "styled-components";

export default styled.a`
  :active,
  :focus,
  .active {
    color: ${({ theme }) => theme.fg};
    background: ${({ theme }) => theme.highlight};
  }
`;
