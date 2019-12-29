import React from "react";
import styled from "styled-components";

import { fadeIn } from "../../../../constants/styles/animation";
import NavItem from "./components/NavItem";
import NavWrapper from "./components/NavWrapper";

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
