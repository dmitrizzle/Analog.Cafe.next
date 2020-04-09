import React from "react";
import styled, { css } from "styled-components";

import {
  c_error,
  c_input,
  c_warning,
} from "../../../../constants/styles/colors";
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
  background: ${({ error, warning }) => {
    let color = c_input;
    if (error) color = c_error;
    if (warning) color = c_warning;
    return color;
  }} !important;
`;
// eslint-disable-next-line
export default styled(({ error, warning, ...props }) => <input {...props} />)`
  ${subtitle};
`;
