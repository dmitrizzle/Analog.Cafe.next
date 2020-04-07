import styled, { css } from "styled-components";

import { c_red, c_white } from "../../../../constants/styles/colors";
import { makeFroth } from "../../../../utils/froth";

export default styled.div`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 1em;
  background: ${c_red};
  background-size: cover;
  margin: 0 0 0 0.15em;
  box-shadow: 0 0 0 1px ${c_white}, 0 0 0 2px ${c_red};
  ${props =>
    props.user.status === "ok" &&
    props.user.info &&
    props.user.info.image &&
    css`
      background-image: url(${makeFroth({
        src: props.user.info.image,
        size: "i",
      }).src});
    `}
`;
