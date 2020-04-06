import styled from "styled-components";

import { b_phablet, m_radius } from "../../../../constants/styles/measurements";
import { c_black, c_grey_light } from "../../../../constants/styles/colors";
import { makeFroth } from "../../../../utils/froth";
import { title } from "../../../../constants/styles/typography";
import Link from "../Link";

export default styled(Link)`
  height: 12em;
  width: 26em;

  margin: 0 ${1 * 0.5}em 0 0;
  position: relative;
  flex-shrink: 0;
  overflow: hidden;

  text-decoration: none;
  line-height: ${1 * 1.15}em;

  box-shadow: 0 0 0 1px ${c_black};

  border-radius: ${m_radius};
`;
export const LabelWrap = styled.div`
  text-align: right;
  position: absolute;
  bottom: ${props => (props.list ? 1.35 : 0.5)}em;
  right: 0.5em;
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
        size: "s",
      }).src})
    ${props => props.center && "center"} !important;
  background-size: cover !important;
  @media (min-width: ${b_phablet}) {
    background: ${c_grey_light}
      url(${props =>
        makeFroth({
          src: props.src,
          size: "s",
        }).src})
      ${props => props.center && "center"} !important;
    background-size: cover !important;
  }
`;

export const DocketInfo = styled.div`
  position: absolute;
  top: 0;
  right: 0.5em;
  left: calc(8em + 1em);
  bottom: 0;

  h4 {
    font-size: 1em !important;
    padding-top: 1em;
    margin-bottom: 0.25em;
    ${title}
  }
`;
