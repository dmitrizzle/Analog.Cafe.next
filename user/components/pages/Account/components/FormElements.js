import styled from "styled-components";

import {
  b_mobile,
  b_movie,
} from "../../../../../constants/styles/measurements";
import Form from "../../../forms/Form";
import LinkButton from "../../../../../core/components/controls/Button/components/LinkButton";

export const TwitterButton = styled(LinkButton)`
  background: #1da1f2;
  box-shadow: 0 0 0 1px #1da1f2;
  svg {
    height: 2em;
    margin: -1em 0 -1em -1.75em;
    @media (min-width: ${b_movie}) {
      margin: -1em 0em -1em -0.5em;
    }
  }
`;
export const FacebookButton = styled(LinkButton)`
  background: #4267b2;
  box-shadow: 0 0 0 1px #4267b2;
  svg {
    height: 2em;
    margin: -1em 0 -1em -1.75em;
    @media (min-width: ${b_movie}) {
      margin: -1em -0.5em;
    }
  }
`;

export const EmailForm = styled(Form)`
  button: {
    font-size: 1em;
  }
  @media (max-width: ${b_mobile}) {
    section & {
      margin: 0 !important;
    }
  }
`;
