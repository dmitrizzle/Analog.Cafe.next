import styled from "styled-components";

export default styled.span`
  color: ${props => {
    if (props.branded) return { c_black };
    return { c_red };
  }};
`;
