import styled, { css } from "styled-components";

import Link from "../../../controls/Link";

export default styled.div`
  height: 35em;
  margin-top: 3em;
  margin-bottom: 1.5em;

  ${({ overflow }) =>
    overflow
      ? css`
          overflow: visible;
          cursor: default;
          opacity: 1;
        `
      : css`
          overflow: hidden;
          cursor: pointer;
          opacity: 0.75;
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
  display: block;
  width: ${1.5 * 2}em;
  height: ${1.5 * 2}em;
  margin: ${1 / 4}em;
  overflow: hidden;
  border-radius: ${1.5}em;

  background-size: cover !important;
  background-color: ${({ theme }) => theme.brand};
`;
