import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Router, { withRouter } from "next/router";
import styled from "styled-components";

import { HideOnLargePhablet } from "../../vignettes/HideOnScreenSize";
import { NAME } from "../../../../constants/messages/system";
import { NAV_MIN_MAP } from "../../../../constants/router/breadcrumbs";
import { NavLink } from "./components/NavLinks";
import { ROUTE_LABELS } from "../../pages/List/constants";
import { c_red, c_white } from "../../../../constants/styles/colors";
import { setModal } from "../../../store/actions-modal";
import { withRedux } from "../../../../utils/with-redux";
import ArrowReturn from "../../icons/ArrowReturn";
import Burger from "../../icons/Burger";
import NavBrandName from "./components/NavBrandName";
import NavItem from "./components/NavItem";
import NavLogo from "./components/NavLogo";
import NavMenu, { menuModal } from "./components/NavMenu";
import NavWrapper from "./components/NavWrapper";
import User from "../../icons/User";

export const navIconStyles = { height: ".75em", paddingBottom: ".15em" };

const NavLogoSwap = styled(NavLink)`
  background: ${c_white} !important;
  svg {
    height: 1em;
    padding-bottom: 0.25em;
  }
  :active,
  :focus {
    background: ${c_white} !important;
    svg path {
      fill: ${c_red} !important;
    }
  }
`;

const Nav = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const { asPath, query, pathname } = props.router;
  const homepage = pathname === "/";

  const [shouldAnimateFade, setAnimationRule] = useState(false);
  const isCancelled = React.useRef(false); // when component is unmounted

  const collection = query.collection;

  Router.events.on("routeChangeStart", () => {
    if (!isCancelled.current) setAnimationRule(false);
  });

  React.useEffect(() => {
    return () => {
      isCancelled.current = true;
    };
  }, []);

  Router.events.on("routeChangeComplete", () => {
    if (window.scrollY < 160) return;
    if (!isCancelled.current) setAnimationRule(true);
    const loadingStateTimeout = window.setTimeout(() => {
      clearTimeout(loadingStateTimeout);
      if (!isCancelled.current) setAnimationRule(false);
    }, 500);
  });

  const [previousViewConfig, setViewConfig] = useState(props.isMinimal);
  useEffect(() => {
    previousViewConfig === true && setAnimationRule(true);
    setViewConfig(props.isMinimal);
  }, [props.isMinimal]);

  const upTree = path => {
    let match =
      NAV_MIN_MAP[
        Object.keys(NAV_MIN_MAP).filter(key => path.includes(key))[0]
      ];
    // exceptions
    if (path === "/write/draft" && user.status === "ok") match = "/account";
    if (path === "/account/profile") match = "/account";
    return match || "/";
  };

  return (
    <NavWrapper
      tallMargin={props.tallMargin}
      shouldAnimateFade={shouldAnimateFade}
      data-cy="Nav"
    >
      <ul>
        {!props.isMinimal && (
          <NavItem>
            <NavLink href="/about">About</NavLink>
          </NavItem>
        )}

        {!props.isMinimal && (
          <NavItem>
            <NavLink href="/shop">Shop</NavLink>
          </NavItem>
        )}

        {!props.isMinimal ? (
          <NavItem prime center>
            <NavLink href="/">
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

        {!props.isMinimal && (
          <NavItem prime left>
            <NavLink
              data-cy="NavLinkYourAccount"
              href={user.status === "ok" ? "/account" : "/sign-in"}
            >
              <HideOnLargePhablet>Your </HideOnLargePhablet>Account{" "}
              <User user={user} />
            </NavLink>
          </NavItem>
        )}

        {!props.isMinimal && (
          <NavItem prime right>
            <NavMenu data-cy="NavLinkMenu">
              Menu <Burger />
            </NavMenu>
          </NavItem>
        )}
      </ul>

      <NavBrandName
        data-cy="NavBrandName"
        correctedWidth={
          query?.filter
            ? ROUTE_LABELS["/" + query.filter]?.width
            : homepage || props.showBrandName
            ? ROUTE_LABELS[asPath]?.width || "6.5em"
            : 0
        }
        collection={collection}
        scroll={false}
        to={collection ? "/" + query.filter : "/nav/menu"}
        onClick={event => {
          if (
            !collection &&
            (homepage ||
              asPath === "/apps-and-downloads" ||
              asPath === "/account/all-submissions" ||
              asPath === "/account/bookmarks") &&
            props.showBrandName
          ) {
            event.preventDefault();
            dispatch(setModal(menuModal));
          }
        }}
      >
        <span>
          {query && query.filter
            ? ROUTE_LABELS["/" + query.filter] &&
              ROUTE_LABELS["/" + query.filter].title
            : ROUTE_LABELS[asPath]?.title || NAME}
        </span>
      </NavBrandName>
    </NavWrapper>
  );
};

export default withRouter(withRedux(Nav));
