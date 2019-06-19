import styled from "styled-components";

import { b_tablet, m_radius } from "../../../../constants/styles/measurements";
import { c_black, c_grey_light } from "../../../../constants/styles/colors";
import { makeFroth } from "../../../../utils/froth";
import Link from "../Link";

export default styled(Link)`
  width: 26em;
  height: 12em;

  margin: 0 ${1 * 0.5}em 0 0;
  position: relative;
  flex-shrink: 0;
  overflow: hidden;

  text-decoration: none;
  line-height: ${1 * 1.15}em;

  border-bottom: 8px solid ${c_black};
  box-shadow: 0 0 0.5em rgba(44, 44, 44, 0.125);

  @media (max-width: ${b_tablet}) {
    border-radius: ${m_radius};
  }
`;
export const DocketImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 8em;
  bottom: 0;
  background: ${c_grey_light}
    url(${props =>
      makeFroth({
        src: props.src,
        size: "m",
      }).src})
    ${props => props.center && "center"} !important;
  background-size: cover !important;
`;

export const DocketInfo = styled.div`
  position: absolute;
  top: 0;
  right: 0.5em;
  left: calc(8em + 1em);
  bottom: 0;

  h4 {
    font-size: 1em !important;
  }
`;
