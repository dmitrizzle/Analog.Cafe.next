import React from "react";
import styled from "styled-components";

import { APP } from "../../../../../constants/messages";
import {
  c_black,
  c_black_a25,
  c_red
} from "../../../../../constants/styles/colors";
import Logo from "../../../icons/Logo";

const NavLogo = styled.div`
  position: absolute;
  top: -1.75em;
  left: calc(50% - 2.5em);
  z-index: 10;
  padding: 1em;
  width: 5em;
`;
const LogoWithDownstate = styled(Logo)`
  background: ${props => (props.red ? c_red : c_black)};
  box-shadow: ${c_black_a25} 0px 1px 1px;

  a.active &,
  a:active & {
    background: ${c_red};
  }
  a:active & {
    box-shadow: 0 0 ${c_black} inset;
  }
`;

export default props => (
  <NavLogo {...props} title={APP.NAME}>
    <LogoWithDownstate {...props} />
  </NavLogo>
);
