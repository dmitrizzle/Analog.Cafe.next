import React from "react";
import styled from "styled-components";

import { NAME } from "../../../../../constants/messages/system";
import {
  c_black,
  c_red,
  c_white,
} from "../../../../../constants/styles/colors";
import { m_radius } from "../../../../../constants/styles/measurements";
import Logo from "../../../icons/Logo";

const NavLogo = styled(Logo)`
  width: 2em;
  height: 2em;
  overflow: hidden;
  margin: 0 auto;
  padding: 0.5em;
  border-radius: ${m_radius};
  transform: rotate(45deg);

  background: ${c_black};
  ${"" /* box-shadow: 0 0 0 1px ${c_grey_med}; */}
  a.active &,
  a:active &,
  a:focus & {
    background: ${c_red};
    ${"" /* box-shadow: 0 0 0 1px ${c_red}; */}
  }

  svg {
    transform: rotate(-45deg);
    height: 100%;
    width: 100%;
  }
  svg path {
    fill: ${c_white};
  }
  ${"" /* a.active &,
  a:active &,
  a:focus & {
    svg path {
      fill: ${c_white};
    }
  } */}
`;

const LogoWrapper = styled.div`
  position: absolute;
  top: -1.75em;
  left: calc(50% - 2.5em);
  z-index: 10;
  padding: 1em;
`;

export default props => (
  <LogoWrapper>
    <NavLogo {...props} title={NAME} />
  </LogoWrapper>
);
