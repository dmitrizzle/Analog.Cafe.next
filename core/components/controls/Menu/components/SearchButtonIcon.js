import styled from "styled-components";

export default styled.span`
  svg {
    width: 1em;
    margin: -0.25em 0.15em 0 0;
    z-index: 1;
    position: relative;
    path {
      stroke: ${({ inverse, theme }) => (inverse ? theme.bg : theme.fg)};
      stroke-width: 2;
    }
    a:active &,
    a:focus &,
    a.active & {
      path {
        stroke: ${({ theme }) => theme.bg};
      }
    }
  }
`;
