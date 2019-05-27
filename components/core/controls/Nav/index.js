import { withRouter } from "next/router";
import React from "react";

import { APP } from "../../../../constants/messages";
import { NavLink, NavLogoLink } from "./components/NavLinks";
import NavBrandName from "./components/NavBrandName";
import NavItem from "./components/NavItem";
import NavLogo from "./components/NavLogo";
import NavWrapper from "./components/NavWrapper";

const Nav = props => {
  return (
    <NavWrapper>
      <ul>
        <NavItem prime left>
          <NavLink href="/features" prefetch>
            Features
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink>Topics</NavLink>
        </NavItem>

        <NavItem prime center>
          <NavLogoLink href="/" prefetch>
            <NavLogo />
          </NavLogoLink>
        </NavItem>

        <NavItem>
          <NavLink href="/about">About</NavLink>
        </NavItem>

        <NavItem prime right>
          <NavLink>Menu</NavLink>
        </NavItem>
      </ul>
      {props.showBrandName && (
        <NavBrandName homepage={props.router.pathname === "/"}>
          {APP.NAME}
        </NavBrandName>
      )}
    </NavWrapper>
  );
};

export default withRouter(Nav);
