import styled from "styled-components";

export default styled.summary`
  ::-webkit-details-marker {
    display: none;
  }
  ::marker {
    content: "";
  }
  cursor: pointer;
  outline: none;
  label a {
    text-decoration: none;
    :active {
      background: inherit;
    }
  }
`;
