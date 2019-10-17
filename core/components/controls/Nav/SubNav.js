import React from "react";
import styled, { keyframes, css } from "styled-components";

import NavItem from "./components/NavItem";
import NavWrapper from "./components/NavWrapper";

const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;

export default styled(NavWrapper)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0;
  min-height: 2.5em;
  opacity: 0;
  animation: ${fadeIn} 250ms forwards;
`;
export const SubNavItem = styled(props => <NavItem {...props} prime />)`
  width: auto !important;
  margin: 0 0.175em;
`;
