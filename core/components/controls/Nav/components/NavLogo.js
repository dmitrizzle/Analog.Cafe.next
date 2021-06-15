import { useSelector } from "react-redux";
import React, { useContext } from "react";
import styled, { css } from "styled-components";

import { AppLoadingContext } from "../../../vignettes/AppLoadingContextProvider";
import { NAME } from "../../../../../constants/messages/system";
import { fadeOutIn } from "../../../../../constants/styles/animation";
import { m_radius } from "../../../../../constants/styles/measurements";
import { withRedux } from "../../../../../utils/with-redux";

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

  box-shadow: 0 0 0 1.5px ${({ theme }) => theme.fg};

  /* transition: all 500ms; */
  a.active &,
  a:active &,
  a:focus &,
  a:focus &,
  .touch &:hover {
    div {
      width: 6px;
      height: 6px;
    }
  }
  a: active &;
  /* a:focus & {
    transition: 0ms;
    div {
      transition: 0ms;
    }
  } */
`;

const LogoDot = styled.div`
  width: 6px;
  height: 6px;
  background: ${({ theme }) => theme.brand};
  margin-top: ${Math.sqrt(Math.pow(6 / 2, 2) + Math.pow(6 / 2, 2)) / 2}px;
  margin-left: ${Math.sqrt(Math.pow(6 / 2, 2) + Math.pow(6 / 2, 2)) / 2}px;

  border-radius: 6px;
  /* transition: all 500ms; */
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
  // eslint-disable-next-line
  const theme = useSelector(({ theme }) => theme);

  return (
    <LogoWrapper>
      <LogoRhombus {...props} title={NAME}>
        <LogoDot isLoading={isRouteLoading || isModalLoading} />
      </LogoRhombus>
    </LogoWrapper>
  );
};

export default withRedux(NavLogoComponent);
