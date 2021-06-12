import React, { useContext } from "react";
import styled, { css } from "styled-components";

import { AppLoadingContext } from "../../../vignettes/AppLoadingContextProvider";
import { NAME } from "../../../../../constants/messages/system";
import { fadeOutIn } from "../../../../../constants/styles/animation";
import { m_radius } from "../../../../../constants/styles/measurements";

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

  transition: all 500ms;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.fg} inset;

  a & {
    background: inherit !important;
  }
  a.active &,
  a:active &,
  a:focus &,
  a:focus &,
  .touch &:hover {
    background: inherit !important;
    box-shadow: 0 0 0 1px ${({ theme }) => theme.brand} inset;
    div {
      background: ${({ theme }) => theme.brand};
    }
  }

  a:active &,
  a:focus & {
    transition: 0ms;
    div {
      transition: 0ms;
    }
  }
`;

const LogoDot = styled.div`
  width: 5px;
  height: 5px;
  background: ${({ theme }) => theme.fg};

  border-radius: 5px;
  transition: background 500ms;
  ${({ isLoading }) =>
    isLoading &&
    css`
      animation: ${fadeOutIn} 2000ms infinite;
    `}
`;

const LogoWrapper = styled.div`
  position: absolute;
  top: -1.5em;
  left: calc(50% - 2.25em);
  z-index: 10;
  padding: 1em;
`;

const NavLogoComponent = props => {
  const { isRouteLoading, isModalLoading } = useContext(AppLoadingContext);

  return (
    <LogoWrapper>
      <LogoRhombus {...props} title={NAME}>
        <LogoDot isLoading={isRouteLoading || isModalLoading} />
      </LogoRhombus>
    </LogoWrapper>
  );
};

export default NavLogoComponent;
