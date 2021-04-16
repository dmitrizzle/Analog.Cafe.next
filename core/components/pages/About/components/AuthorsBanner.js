import styled, { css } from "styled-components";

import { m_radius_sm } from "../../../../../constants/styles/measurements";
import { title } from "../../../../../constants/styles/typography";
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
  display: flex;
  width: 2.225em;
  height: 2.225em;
  margin: ${1 / 4}em;
  overflow: hidden;
  border-radius: ${m_radius_sm};

  ${title};
  color: ${({ theme }) => theme.bg};
  text-decoration: none;
  justify-content: center;
  align-items: center;

  background-size: cover !important;
  background-color: ${({ theme }) => theme.brand};
`;
