import styled from "styled-components";
import {
  b_laptop,
  b_movie,
  b_tablet,
  m_column,
  m_column_lg
} from "../../../../../constants/styles/measurements";
import { bleed } from "../../../vignettes/Picture/components/Figure";
import { c_black, c_red } from "../../../../../constants/styles/colors";
import { makeFroth } from "../../../../../utils/froth";
import Link from "../../../controls/Link";

const metaTitle = "About";
const metaDescription =
  "Analog.Cafe is created by film photographers, artists, and writers of the internet. Published every Tuesday and most Thursday mornings. Maintained as an open-source project by Dmitri.";

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

  margin-left: calc((-100vw + ${m_column}) / 2);

  @media (max-width: ${b_tablet}) {
    ${bleed}
  }
  @media (min-width: ${b_movie}) {
    margin-left: calc((-100vw + ${m_column_lg}) / 2);
  }

  border-bottom: 8px solid ${c_black};
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
  background-color: ${c_red};
`;
