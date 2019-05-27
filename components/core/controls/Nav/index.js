import React from "react";

import { APP } from "../../../../constants/messages";
import { NavLogoLink } from "./components/NavLinks";
import NavItem from "./components/NavItem";
import NavLogo from "./components/NavLogo";
import NavWrapper from "./components/NavWrapper";
import { withRouter } from "next/router";

const Nav = props => {
  return (
    <NavWrapper>
      <ul>
        <NavItem prime center>
          <NavLogoLink href="/">
            <NavLogo />
          </NavLogoLink>
        </NavItem>
      </ul>
      {props.router.pathname === "/" && <div>{APP.NAME}</div>}
    </NavWrapper>
  );
};

export default withRouter(Nav);
