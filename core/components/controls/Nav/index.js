import { connect } from "react-redux";
import { withRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

import {
  HideOnLargePhablet,
  HideOnMobile,
  HideOnPhablet,
  ShowOnPhablet,
} from "../../vignettes/HideOnScreenSize";
import { NAME } from "../../../../constants/messages/system";
import { NavLink } from "./components/NavLinks";
import { ROUTE_LABELS } from "../../pages/List/constants";
import { c_red, c_white } from "../../../../constants/styles/colors";
import { setModal } from "../../../store/actions-modal";
import ArrowReturn from "../../icons/ArrowReturn";
import Burger from "../../icons/Burger";
import NavBrandName from "./components/NavBrandName";
import NavItem from "./components/NavItem";
import NavLogo from "./components/NavLogo";
import NavMenu from "./components/NavMenu";
import NavWrapper from "./components/NavWrapper";
import User from "../../icons/User";
import topics from "../Topics";

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
  const { asPath, query, pathname } = props.router;
  const homepage = pathname === "/";

  const routerEvents = props.router.events;

  const [shouldAnimateFade, setAnimationRule] = useState(false);

  const isCancelled = React.useRef(false); // when component is unmounted

  routerEvents.on("routeChangeStart", () => {
    if (!isCancelled.current) setAnimationRule(false);
  });

  React.useEffect(() => {
    return () => {
      isCancelled.current = true;
    };
  }, []);

  routerEvents.on("routeChangeComplete", () => {
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
          <>
            <NavItem prime left>
              <HideOnPhablet>
                <NavLink href="/submit">Submissions</NavLink>
              </HideOnPhablet>
              <ShowOnPhablet>
                <NavLink href="/account">
                  <User /> You
                </NavLink>
              </ShowOnPhablet>
            </NavItem>
          </>
        )}

        {!props.isMinimal ? (
          <NavItem prime center>
            <NavLink
              href="/"
              onClick={event => {
                event.preventDefault();
                props.setModal(topics(asPath));
              }}
            >
              <NavLogo />
            </NavLink>
          </NavItem>
        ) : (
          <NavItem prime center>
            <NavLogoSwap
              style={props.isHidden ? { display: "none" } : {}}
              href="/"
              onClick={event => {
                event.preventDefault();
                props.router.back();
              }}
            >
              <ArrowReturn />
            </NavLogoSwap>
          </NavItem>
        )}

        {!props.isMinimal && (
          <NavItem>
            <NavLink href="/account">
              <User /> You<HideOnLargePhablet>r Account</HideOnLargePhablet>
            </NavLink>
          </NavItem>
        )}

        {!props.isMinimal && (
          <NavItem prime right>
            <NavMenu data-cy="NavLinkMenu">
              <HideOnMobile>Menu </HideOnMobile>
              <Burger />
            </NavMenu>
          </NavItem>
        )}
      </ul>

      <NavBrandName
        data-cy="NavBrandName"
        correctedWidth={
          query && query.filter
            ? ROUTE_LABELS["/" + query.filter].width
            : homepage || props.showBrandName
            ? (ROUTE_LABELS[asPath] && ROUTE_LABELS[asPath].width) || "6.5em"
            : 0
        }
        onClick={() => {
          (homepage || asPath === "/links-and-downloads") &&
            props.showBrandName &&
            props.setModal(topics(asPath));
        }}
      >
        <span>
          {query && query.filter
            ? ROUTE_LABELS["/" + query.filter].title
            : (ROUTE_LABELS[asPath] && ROUTE_LABELS[asPath].title) || NAME}
        </span>
      </NavBrandName>
    </NavWrapper>
  );
};

const mapStateToProps = ({ user }) => {
  return { user };
};
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
