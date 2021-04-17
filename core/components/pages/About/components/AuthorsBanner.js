import styled, { css } from "styled-components";

import { blockSmall } from "../../../vignettes/Blocks";
import Link from "../../../controls/Link";

export default styled.div`
  height: 17.5em;
  margin-top: 1.5em;
  margin-bottom: 1.5em;

  overflow: hidden;
  cursor: pointer;
  opacity: 0.75;
  ${({ overflow }) =>
    overflow &&
    css`
      height: auto;
      cursor: default;
      opacity: 1;
    `}};
`;
export const Authors = styled.div`
  display: flex;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-right: -${1 / 4}em;
  margin-left: -${1 / 4}em;
`;
export const AuthorIcon = styled(Link)`
  ${blockSmall};
`;
