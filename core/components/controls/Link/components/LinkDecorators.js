import Link from "next/link";
import React from "react";
import styled, { css } from "styled-components";

import { c_red } from "../../../../../constants/styles/themes";

export const ExternalLink = styled(({ ...props }) => <Link {...props} />)`
  ${({ router }) =>
    (router.asPath.includes("/r/") ||
      router.asPath.includes("/account/submission")) &&
    css`
      text-decoration-color: ${c_red};
    `}
`;

export const Anchor = styled.a`
  ${({ router }) =>
    (router.asPath.includes("/r/") ||
      router.asPath.includes("/account/submission")) &&
    css`
      text-decoration-color: ${c_red};
    `}
`;
