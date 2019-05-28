import styled, { css } from "styled-components";

import { title } from "../../../../../constants/styles/typography";

export const subtitleStyles = css`
  ${title}
  font-size: 1.15em;
`;
export default styled.h2`
  ${subtitleStyles};
`;
