import styled from "styled-components";

import { b_mobile } from "../../../../../constants/styles/measurements";
import { c_charcoal } from "../../../../../constants/styles/themes";

export const ColumnWrapper = styled.div`
  column-width: ${b_mobile};
  @media (max-width: 710px) and (min-width: 411px) {
    column-width: calc(50vw - 2em);
  }
  > *:active {
    background: 0 0;
  }

  > * {
    width: 100%;
    display: inline-block;
    column-break-inside: avoid;
    margin: 0 0 0.5em;

    @media (max-width: ${b_mobile}) {
      margin-left: -1.5em !important;
    }
  }
`;
export const Divider = styled.div`
  border-bottom: 1px solid ${c_charcoal};
  padding-bottom: 3em;
`;
