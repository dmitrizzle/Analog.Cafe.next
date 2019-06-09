import styled from "styled-components";

import { c_grey_light } from "../../../../../constants/styles/colors";
import { makeFroth } from "../../../../../utils/froth";
import Link from "../../../controls/Link";

export default styled(Link)`
  border-bottom: 8px solid;
  overflow: hidden;
  display: block;
  h3 {
    font-size: 1.25em;
    font-style: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const AuthorCardStubImage = styled.div`
  width: 10em;
  height: 10em;
  background: ${c_grey_light}
    url(${props =>
      makeFroth({
        src: props.src,
        size: "m",
      }).src});
  background-size: cover;
  float: left;
  background-position: center;
  button {
    margin: 10.75em 0.5em;
  }
`;

export const AuthorCardStubInfo = styled.div`
  float: left;
  width: calc(100% - 10em - 3em);
  padding: 0 1.5em;
  height: 10em;
`;
