import React from "react";

import { NavLogoLink } from "./components/NavLinks";
import NavItem from "./components/NavItem";
import NavLogo from "./components/NavLogo";
import NavWrapper from "./components/NavWrapper";

export default props => {
  return (
    <NavWrapper>
      <ul>
        <NavItem prime center>
          <NavLogoLink href="/">
            <NavLogo />
          </NavLogoLink>
        </NavItem>
      </ul>
    </NavWrapper>
  );
};
