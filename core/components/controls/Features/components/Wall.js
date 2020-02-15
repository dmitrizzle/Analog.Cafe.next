import styled, { css } from "styled-components";

import { LabelWrap } from "../../Docket";
import { c_black, c_white } from "../../../../../constants/styles/colors";

export default styled.div`
  /* this allows better position for scrollbars */
  height: 8em;
  transition: height 250ms;

  padding-top: 3em;
  padding-bottom: 0.75em;

  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translateZ(0);
`;

export const unstyledLinks = css`
  a {
    text-decoration: none;
  }
  a:active,
  a:focus {
    background: 0 0;
  }
`;
export const CollectionDescription = styled.blockquote`
  margin: 1.5em auto !important;
  ${unstyledLinks};
`;

export const BreadcrumbsWrap = styled(LabelWrap)`
  top: 0;
  font-style: normal;
  width: auto;
  height: 2em;
  ${unstyledLinks};
  label {
    line-height: 1.25em;
  }
  a:last-child {
    label {
      background: ${c_black};
      color: ${c_white};
    }
  }
`;
