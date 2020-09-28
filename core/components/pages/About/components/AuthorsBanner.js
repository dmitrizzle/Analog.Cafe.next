import styled, { css } from "styled-components";

import {
  b_movie,
  m_column,
  m_column_lg,
} from "../../../../../constants/styles/measurements";
import { bleed } from "../../../vignettes/Picture/components/Figure";
import Link from "../../../controls/Link";

export default styled.div`
  width: 100vw;
  height: 17.5em;

  ${({ overflow }) =>
    overflow
      ? css`
          overflow: scroll;
          cursor: default;
          opacity: 1;
        `
      : css`
          overflow: hidden;
          cursor: pointer;
          opacity: 0.75;
        `}};

  margin-top: 3em !important;
  margin-bottom: 1.5em !important;

  margin-left: calc((-100vw + ${m_column}) / 2);

  @media (max-width: 814px) {
    ${bleed}
  }
  @media (min-width: ${b_movie}) {
    margin-left: calc((-100vw + ${m_column_lg}) / 2);
  }
`;
export const Authors = styled.div`
  display: flex;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: center;
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
