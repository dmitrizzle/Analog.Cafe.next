import styled, { css } from "styled-components";

import {
  b_movie,
  b_tablet,
  m_column,
  m_column_lg,
  m_radius
} from "../../../../../constants/styles/measurements";
import { c_black, c_grey_light } from "../../../../../constants/styles/colors";
import { makeFroth } from "../../../../../utils/froth";
import GridButton from "../../../controls/Button/components/GridButton";
import Link from "../../../controls/Link";

export default styled.div`
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  width: 100vw;
  padding: 1em 0 0;
  margin-left: -1.5em;

  @media (min-width: ${b_tablet}) {
    margin-left: calc((-100vw + ${m_column}) / 2 + 0.5em);
  }
  @media (min-width: ${b_movie}) {
    margin-left: calc((-100vw + ${m_column_lg}) / 2 + 0.5em);
  }

  > div {
    display: flex;
  }
`;
const posterDimensions = css`
  width: 26em;
  height: 12em;
`;
export const Poster = styled(Link)`
  ${posterDimensions}

  margin: 0 ${1 * 0.5}em 0 0;
  position: relative;
  flex-shrink: 0;
  overflow: hidden;

  text-decoration: none;
  line-height: ${1 * 1.15}em;

  border-bottom: 8px solid ${c_black};
  box-shadow: 0 0 0.5em
    rgba(44,44,44,.125);

  @media (max-width: ${b_tablet}) {
    border-radius:	${m_radius};
  }
`;
export const PosterImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 8em;
  bottom: 0;
  background: ${c_grey_light}
    url(${props =>
      makeFroth({
        src: props.src,
        size: "m"
      }).src})
    ${props => props.center && "center"} !important;
  background-size: cover !important;
`;

export const PosterInfo = styled.div`
  position: absolute;
  top: 0;
  right: 0.5em;
  left: calc(8em + 1em);
  bottom: 0;

  h4 {
    font-size: 1em;
  }
`;

export const Spacer = styled.div`
  width: 0.5em;
  height: 11.7558em;
  flex-shrink: 0;
`;
