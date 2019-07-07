import React from "react";
import styled from "styled-components";

import NavItem from "./components/NavItem";
import NavWrapper from "./components/NavWrapper";

export default styled(NavWrapper)`
  display: flex;
  justify-content: center;
  margin: 0;
`;
export const SubNavItem = styled(props => <NavItem {...props} prime />)`
  width: auto !important;
  margin: 0 0.175em;
`;
