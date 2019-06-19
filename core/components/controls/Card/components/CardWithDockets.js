import styled from "styled-components";

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

  ${"" /* label */}
  button {
    margin: 8.35em 0.4em;
  }
`;

export const CardWithDocketsInfo = styled.div`
  float: left;
  width: calc(50% - 1em);
  padding: 0 0.5em;
  height: 8em;

  h4 {
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1em !important;
  }
`;
