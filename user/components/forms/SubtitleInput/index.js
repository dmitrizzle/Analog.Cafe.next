import React from "react";
import styled, { css } from "styled-components";

import { c_error, c_warning } from "../../../../constants/styles/colors";
import { title } from "../../../../constants/styles/typography";

export const warning = css`
  ${props => props.warning && `background:` + c_error};
`;
export const caution = css`
  ${props => props.caution && `background: ` + c_warning};
`;
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
  ${caution} ${warning};
`;
export default styled(({ caution, warning, ...props }) => <input {...props} />)`
  box-shadow: rgba(44, 44, 44, 0.125) 0px 0px 1.5em inset;
  ${subtitle};
`;
