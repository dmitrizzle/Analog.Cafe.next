import React from "react";
import styled, { css } from "styled-components";

import { APP } from "../../../../../constants/messages";
import {
  c_black,
  c_black_a25,
  c_red,
  c_white,
} from "../../../../../constants/styles/colors";
import { m_radius } from "../../../../../constants/styles/measurements";
import Logo from "../../../icons/Logo";

const activeStyles = css`
  background: ${c_red};
  box-shadow: 0 0 ${c_black} inset;
`;

const NavLogo = styled(Logo)`
  background: ${props => (props.red ? c_red : c_black)};
  box-shadow: ${c_black_a25} 0px 1px 1px;
  width: 2em;
  height: 2em;
  overflow: hidden;
  margin: 0 auto;
  padding: 0.5em;
  border-radius: ${m_radius};
  transform: rotate(45deg);

  a:active & {
    box-shadow: ${c_black_a25} 0 0 1px inset;
  }
  a.active &,
  a:active & {
    background: ${c_red};
  }

  svg {
    transform: rotate(-45deg);
    height: 100%;
    width: 100%;
  }
  svg path {
    fill: ${c_white};
  }
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
    <NavLogo {...props} title={APP.NAME} />
  </LogoWrapper>
);
