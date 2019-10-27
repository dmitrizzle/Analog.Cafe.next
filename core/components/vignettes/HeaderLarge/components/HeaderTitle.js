import styled, { css } from "styled-components";

import { title } from "../../../../../constants/styles/typography";

export const headerTitleStyles = css`
  ${title}
  font-size:  3em;
  hyphens: auto;
  min-height: 1em;
`;
export default styled.h1`
  ${headerTitleStyles}
`;
