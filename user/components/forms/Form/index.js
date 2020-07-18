import styled from "styled-components";

import { b_mobile, b_movie } from "../../../../constants/styles/measurements";
import { c_input } from "../../../../constants/styles/colors";

export default styled.form`
  max-width: ${b_mobile};
  @media (min-width: ${b_movie}) {
    max-width: 380px;
  }
  margin: 0 auto !important;

  overflow: hidden;
  background: ${c_input};
  input,
  textarea {
    padding: 0;
    border-radius: 0;
    background: ${c_input};
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
  ${({ withinGroup }) =>
    withinGroup &&
    `
    border-radius: 0 !important;
    border-bottom: 1px solid ${({ theme }) => theme.fg};

  `};
`;
