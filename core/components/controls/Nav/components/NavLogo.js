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
  width: 1.5em;
  height: 1.5em;
  overflow: hidden;
  margin: 0 auto;
  padding: 0.5em;
  border-radius: ${m_radius};
  transform: rotate(45deg);

  transition: background 500ms;
  background: ${c_black};

  a.active &,
  a:active &,
  a:focus & {
    background: ${c_red};
  }

  a:active &,
  a:focus & {
    transition: background 0ms;
  }

  .touch & {
    &:hover {
      background: ${c_red};
    }
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
  top: -1.5em;
  left: calc(50% - 2.25em);
  z-index: 10;
  padding: 1em;
`;

export default props => (
  <LogoWrapper>
    <NavLogo {...props} title={NAME} />
  </LogoWrapper>
);
