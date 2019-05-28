import { withRouter } from "next/router";
import React from "react";
import styled from "styled-components";

import { APP } from "../../../../constants/messages";
import { NavLink } from "./components/NavLinks";
import { b_phablet } from "../../../../constants/styles/measurements";
import Burger from "../../icons/Burger";
import Cube from "../../icons/Cube";
import NavBrandName from "./components/NavBrandName";
import NavItem from "./components/NavItem";
import NavLogo from "./components/NavLogo";
import NavModal from "./components/NavModal";
import NavWrapper from "./components/NavWrapper";

export const NotOnMicroScreens = styled.span`
  @media (max-width: ${b_phablet}) {
    display: none;
  }
`;
const navIconStyles = { height: ".75em", paddingBottom: ".15em" };

const Nav = props => {
  return (
    <NavWrapper>
      <ul>
        <NavItem prime left>
          <NavLink href="/features" prefetch>
            Features
            <NotOnMicroScreens>
              {" "}
              <Cube style={navIconStyles} />
            </NotOnMicroScreens>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink href="#topics">Topics</NavLink>
        </NavItem>

        <NavItem prime center>
          <NavLink href="/" prefetch>
            <NavLogo />
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink href="/about">About</NavLink>
        </NavItem>

        <NavItem prime right>
          <NavModal>
            Menu <Burger />{" "}
          </NavModal>
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
