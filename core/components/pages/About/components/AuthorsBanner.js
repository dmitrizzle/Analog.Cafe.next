import styled from "styled-components";

import {
  b_laptop,
  b_movie,
  m_column,
  m_column_lg,
} from "../../../../../constants/styles/measurements";
import { bleed } from "../../../vignettes/Picture/components/Figure";
import { makeFroth } from "../../../../../utils/froth";
import Link from "../../../controls/Link";

export default styled.div`
  width: 100vw;
  min-height: 26em;
  height: 66vw;
  max-height: 36em;

  overflow: hidden;

  padding: ${1.5 * 2}em 0 0;
  background-image: url(${props =>
    makeFroth({ src: props.src, size: "l" }).src});

  @media (max-width: ${b_laptop}) {
    background-image: url(${props =>
      makeFroth({ src: props.src, size: "m" }).src});
  }

  background-size: cover;
  background-position: bottom center;
  background-repeat: no-no-repeat;

  margin-left: calc((-100vw + ${m_column}) / 2);

  @media (max-width: 814px) {
    ${bleed}
  }
  @media (min-width: ${b_movie}) {
    margin-left: calc((-100vw + ${m_column_lg}) / 2);
  }

  border-bottom: 1px solid ${({ theme }) => theme.fg};
`;
export const Authors = styled.div`
  display: flex;
  max-width: ${m_column};
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
