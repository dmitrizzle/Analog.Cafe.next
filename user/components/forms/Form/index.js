import styled from "styled-components";

import { b_mobile } from "../../../../constants/styles/measurements";
import { c_black } from "../../../../constants/styles/colors";

export default styled.form`
  max-width: ${b_mobile}px;
  margin: 0 auto !important;
  background: rgba(44, 44, 44, 0.125);
  overflow: hidden;
  input {
    text-align: center;
    padding: 0;
    line-height: 2em;
    border-radius: 0;
  }
  button {
    margin: 0;
    border-radius: 0;
  }

  @media (max-width: ${b_mobile}) {
    width: 100vw;
    max-width: 100vw;
    border-radius: 0 !important;
    section & {
      margin-left: -${props => (props.inCard ? 0 : 1.5)}em !important;
    }
  }
  ${props =>
    props.withinGroup &&
    `
    border-radius: 0 !important;
    border-bottom: 8px solid ${c_black};

  `};
`;
