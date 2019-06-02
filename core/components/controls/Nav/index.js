import { connect } from "react-redux";
import { withRouter } from "next/router";
import React from "react";
import styled from "styled-components";

import { NAME } from "../../../../constants/messages/app";
import { NavLink } from "./components/NavLinks";
import { b_mobile, b_phablet } from "../../../../constants/styles/measurements";
import { setModal } from "../../../store/actions-modal";
import Burger from "../../icons/Burger";
import Cube from "../../icons/Cube";
import NavBrandName from "./components/NavBrandName";
import NavItem from "./components/NavItem";
import NavLogo from "./components/NavLogo";
import NavMenu from "./components/NavMenu";
import NavWrapper from "./components/NavWrapper";
import topics from "../Topics";

export const HideOnMobile = styled.span`
  @media (max-width: ${b_mobile}) {
    display: none;
  }
`;
export const HideOnPhablet = styled.span`
  @media (max-width: ${b_phablet}) {
    display: none;
  }
`;
export const navIconStyles = { height: ".75em", paddingBottom: ".15em" };

const Nav = props => {
  return (
    <NavWrapper>
      <ul>
        <NavItem prime left>
          <NavLink href="/features" prefetch>
            Features
            <HideOnPhablet>
              {" "}
              <Cube style={navIconStyles} />
            </HideOnPhablet>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            href="#topics"
            onClick={event => {
              event.preventDefault();
              props.setModal(topics(props.router.pathname));
            }}
          >
            Topics
          </NavLink>
        </NavItem>

        <NavItem prime center>
          <NavLink
            href="/"
            prefetch
            onClick={event => {
              if (props.router.pathname === "/") {
                event.preventDefault();
                props.setModal(topics(props.router.pathname));
              }
            }}
          >
            <NavLogo />
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink href="/about" prefetch>
            About
          </NavLink>
        </NavItem>

        <NavItem prime right>
          <NavMenu>
            <HideOnMobile>Menu </HideOnMobile>
            <Burger />
          </NavMenu>
        </NavItem>
      </ul>
      {props.showBrandName && (
        <NavBrandName homepage={props.router.pathname === "/"}>
          {NAME}
        </NavBrandName>
      )}
    </NavWrapper>
  );
};

const mapStateToProps = null;
const mapDispatchToProps = dispatch => {
  return {
    setModal: (info, request) => {
      dispatch(setModal(info, request));
    },
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Nav)
);
