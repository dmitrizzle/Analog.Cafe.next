import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Router, { withRouter } from "next/router";
import styled from "styled-components";

import { NAV_MIN_MAP } from "../../../../constants/router/breadcrumbs";
import { NavLink } from "./components/NavLinks";
import { SIGN_IN_MODAL } from "../../layouts/Main/constants";
import { c_red } from "../../../../constants/styles/themes";
import { mapPathnameToNavConfig } from "../../layouts/Main/utils";
import { withRedux } from "../../../../utils/with-redux";
import ArrowReturn from "../../icons/ArrowReturn";
import Burger from "../../icons/Burger";
import NavItem from "./components/NavItem";
import NavLogo from "./components/NavLogo";
import NavMenu, { NavModal } from "./components/NavMenu";
import NavWrapper from "./components/NavWrapper";
import User from "../../icons/User";

export const navIconStyles = { height: ".75em", paddingBottom: ".15em" };

const NavLogoSwap = styled(NavLink)`
  background: ${({ theme }) => theme.bg} !important;
  svg {
    height: 1em;
    padding-bottom: 0.25em;
  }
  :active,
  :focus {
    background: ${({ theme }) => theme.bg} !important;
    svg path {
      fill: ${c_red} !important;
    }
  }
`;

const Nav = props => {
  const user = useSelector(state => state.user);

  const { asPath, pathname } = props.router;

  // router display configuration
  const { isMinimal } = mapPathnameToNavConfig(pathname, user.status);

  const [shouldAnimateFade, setAnimationRule] = useState(false);
  const isCancelled = React.useRef(false); // when component is unmounted

  Router.events.on("routeChangeStart", () => {
    if (!isCancelled.current) setAnimationRule(false);
  });

  React.useEffect(() => {
    return () => {
      isCancelled.current = true;
    };
  }, []);

  Router.events.on("routeChangeComplete", () => {
    if (document.documentElement.scrollTop < 160) return;
    if (!isCancelled.current) setAnimationRule(true);
    const loadingStateTimeout = window.setTimeout(() => {
      clearTimeout(loadingStateTimeout);
      if (!isCancelled.current) setAnimationRule(false);
    }, 500);
  });

  const [previousViewConfig, setViewConfig] = useState(isMinimal);
  useEffect(() => {
    previousViewConfig === true && setAnimationRule(true);
    setViewConfig(isMinimal);
  }, [isMinimal]);

  const upTree = path => {
    let match =
      NAV_MIN_MAP[
        Object.keys(NAV_MIN_MAP).filter(key => path.includes(key))[0]
      ];
    // exceptions
    if (path === "/write/draft" && user.status === "ok")
      match = "/account/profile";
    return match || "/";
  };

  return (
    <NavWrapper shouldAnimateFade={shouldAnimateFade} data-cy="Nav">
      <ul>
        {!isMinimal && (
          <NavItem>
            <NavLink href="/about">About</NavLink>
          </NavItem>
        )}

        {!isMinimal && (
          <NavItem>
            <NavLink href="/shop">Shop</NavLink>
          </NavItem>
        )}

        {!isMinimal ? (
          <NavItem prime center>
            <NavLink href="/" style={{ background: "transparent !important" }}>
              <NavLogo />
            </NavLink>
          </NavItem>
        ) : (
          <NavItem prime center title={`Back to ${upTree(asPath)}`}>
            <NavLogoSwap
              style={props.isHidden ? { display: "none" } : {}}
              href="/"
              onClick={event => {
                event.preventDefault();
                props.router.push(upTree(asPath));
              }}
            >
              <ArrowReturn />
            </NavLogoSwap>
          </NavItem>
        )}

        {!isMinimal && (
          <NavItem prime left>
            <NavModal
              data-cy="NavLinkYourAccount"
              unmarked
              href={user.status === "ok" ? "/account/profile" : "/sign-in"}
              with={SIGN_IN_MODAL}
            >
              {user.status === "ok" ? "Profile" : "Sign In"}{" "}
              <User user={user} />
            </NavModal>
          </NavItem>
        )}

        {!isMinimal && (
          <NavItem prime right>
            <NavMenu data-cy="NavLinkMenu">
              Menu <Burger style={{ marginBottom: "-0.25em" }} />
            </NavMenu>
          </NavItem>
        )}
      </ul>
    </NavWrapper>
  );
};

export default withRouter(withRedux(Nav));
