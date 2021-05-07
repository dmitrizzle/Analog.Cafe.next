import styled from "styled-components";

const ActiveLinkChild = styled.a`
  :active,
  :focus,
  .active {
    color: ${({ theme }) => theme.fg};
    background: ${({ theme }) => theme.highlight};
  }
`;
export default ActiveLinkChild;
