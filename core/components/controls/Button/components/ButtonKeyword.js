import styled from "styled-components";

export default styled.span`
  color: ${(branded, theme) => {
    if (branded) return theme.fg;
    return theme.brand;
  }};
`;
