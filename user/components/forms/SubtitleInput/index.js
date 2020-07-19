import React from "react";
import styled, { css } from "styled-components";

import { title } from "../../../../constants/styles/typography";

export const reset = css`
  width: 100%;
  border: none;
  outline: rgba(0, 0, 0, 0);
  resize: none;
`;
export const subtitle = css`
  ${reset} ${title}
  font-size:  1em;
  line-height: 2.8em;
  text-align: center;
  overflow: hidden;
  background: ${({ error, warning, theme }) => {
    let color = theme.grey_light;
    if (error) color = theme.error;
    if (warning) color = theme.warning;
    return color;
  }} !important;
`;
// eslint-disable-next-line
export default styled(({ error, warning, ...props }) => <input {...props} />)`
  ${subtitle};
`;
