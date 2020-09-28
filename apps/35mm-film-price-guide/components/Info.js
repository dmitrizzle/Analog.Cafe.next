import { css } from "styled-components";
import React from "react";

const Info = () => <small
  css={css`
    color: ${({ theme }) => theme.grey_dark};
    font-size: 0.375em;
  `}
>
  <u
    css={css`
      padding-right: 0.15em;
    `}
  >
    info
  </u>
  ▾
</small>;

export default Info;
