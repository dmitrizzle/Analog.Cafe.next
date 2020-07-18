import React from "react";
import styled from "styled-components";

import { NAME } from "../../../../../constants/messages/system";
import { c_red } from "../../../../../constants/styles/colors";
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
  box-shadow: 0 0 0 1px ${({ theme }) => theme.fg} inset;

  svg {
    transform: rotate(-45deg);
    height: 100%;
    width: 100%;
  }
  svg path {
    fill: ${({ theme }) => theme.fg};
  }

  a.active &,
  a:active &,
  a:focus & {
    box-shadow: 0 0 0 1px ${c_red} inset;
    background: ${c_red};
    svg path {
      fill: ${({ theme }) => theme.bg};
    }
  }

  a:active &,
  a:focus & {
    transition: background 0ms;
  }

  a & {
    background: ${({ theme }) => theme.bg};
  }

  .touch & {
    &:hover {
      background: ${c_red};
    }
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
