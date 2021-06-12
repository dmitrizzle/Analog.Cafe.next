import styled, { css } from "styled-components";

import { blockSmall } from "../../../vignettes/Blocks";
import Link from "../../../controls/Link";

const AuthorsBanner = styled.div`
  margin-top: 2.5em;
  margin-bottom: 1.5em;
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
  display: flex;
  vertical-align: middle;
  align-items: center;
  justify-content: center;

  img {
    width: 200%;
  }
`;
export default AuthorsBanner;
