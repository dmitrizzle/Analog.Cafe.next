import React from "react";
import styled from "styled-components";

import { NAME } from "../../../../../constants/messages/system";
import { m_radius } from "../../../../../constants/styles/measurements";
import Logo from "../../../icons/Logo";

const LogoRhombus = styled.div`
  width: 1.5em;
  height: 1.5em;
  margin: 0 auto;
  padding: 0.5em;
  display: flex;
  vertical-align: middle;
  align-items: center;
  justify-content: center;

  border-radius: ${m_radius};
  transform: rotate(45deg);

  transition: background 500ms;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.fg} inset;

  a.active &,
  a:active &,
  a:focus & {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.brand} inset;
    background: ${({ theme }) => theme.brand};

    div {
      background: ${({ theme }) => theme.bg};
    }
  }

  a:active &,
  a:focus & {
    transition: background 0ms;
    div {
      transition: background 0ms;
    }
  }

  .touch & {
    &:hover {
      background: ${({ theme }) => theme.brand};
      div {
        background: ${({ theme }) => theme.bg};
      }
    }
  }

  a & {
    background: inherit;
  }
`;

const LogoDot = styled.div`
  width: 5px;
  height: 5px;
  background: ${({ theme }) => theme.fg};
  border-radius: 5px;
  transition: background 500ms;
`;

const LogoWrapper = styled.div`
  position: absolute;
  top: -1.5em;
  left: calc(50% - 2.25em);
  z-index: 10;
  padding: 1em;
`;

const NavLogoComponent = props => (
  <LogoWrapper>
    <LogoRhombus {...props} title={NAME}>
      <LogoDot />
    </LogoRhombus>
  </LogoWrapper>
);

export default NavLogoComponent;
