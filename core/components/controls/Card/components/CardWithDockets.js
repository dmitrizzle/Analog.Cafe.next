import styled from "styled-components";

import { b_mobile } from "../../../../../constants/styles/measurements";
import { c_grey_light } from "../../../../../constants/styles/colors";
import { makeFroth } from "../../../../../utils/froth";
import Link from "../../../controls/Link";

export default styled(Link)`
  border-bottom: 8px solid;
  overflow: hidden;
  display: block;
  font-style: normal;
  font-size: 1.25em;
  position: relative;
  @media (max-width: ${b_mobile}) {
    max-width: calc(100vw - 1em + 1px);
  }
`;

export const CardWithDocketsImage = styled.div`
  width: 50%;
  height: 8em;
  background: ${c_grey_light}
    url(${props =>
      makeFroth({
        src: props.src,
        size: "m",
      }).src});
  background-size: cover;
  float: left;
  background-position: center;
`;

export const CardWithDocketsInfo = styled.div`
  float: left;
  width: calc(50% - 1.01em);
  padding: 0 0.5em;
  height: 8em;

  h4 {
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1em !important;
  }
`;
