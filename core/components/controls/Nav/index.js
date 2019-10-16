import { connect } from "react-redux";
import { withRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

import {
  HideOnLargePhablet,
  HideOnMobile,
} from "../../vignettes/HideOnScreenSize";
import { NAME } from "../../../../constants/messages/system";
import { NavLink } from "./components/NavLinks";
import { ROUTE_LABELS } from "../../pages/List/constants";
import { c_red, c_white } from "../../../../constants/styles/colors";
import { setModal } from "../../../store/actions-modal";
import ArrowReturn from "../../icons/ArrowReturn";
import Burger from "../../icons/Burger";
import Save from "../../icons/Save";
import NavBrandName from "./components/NavBrandName";
import NavItem from "./components/NavItem";
import NavLogo from "./components/NavLogo";
import NavMenu from "./components/NavMenu";
import NavWrapper from "./components/NavWrapper";
import topics from "../Topics";

export const navIconStyles = { height: ".75em", paddingBottom: ".15em" };

const rotate = keyframes`
  from {
    transform-origin: bottom right;
    transform: rotate(45deg) scale(0);
  }
  to {
    transform-origin: bottom right;
    transform: rotate(0) scale(1);
  }
`;
const NavLogoSwap = styled(NavLink)`
  background: ${c_white} !important;
  svg {
    transform-origin: bottom right;
    transform: rotate(45deg) scale(0);
    animation: ${rotate} 250ms 1500ms cubic-bezier(0.46, 0.88, 0.37, 1.43)
      forwards;
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
    >
      <ul>
        {!props.isMinimal && (
          <NavItem>
            <NavLink href="/about">About</NavLink>
          </NavItem>
        )}

        {!props.isMinimal && (
          <NavItem prime left>
            <NavLink
              href="/nav/topics"
              onClick={event => {
                event.preventDefault();
                props.setModal(topics(asPath));
              }}
            >
              Topics
            </NavLink>
          </NavItem>
        )}

        {!props.isMinimal ? (
          <NavItem prime center>
            <NavLink
              href="/"
              onClick={event => {
                if (asPath === "/") {
                  event.preventDefault();
                  props.setModal(topics(asPath));
                }
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
            {props.user.status !== "ok" ? (
              <NavLink href="/submit">Submissions</NavLink>
            ) : (
              <NavLink href="/account">
                <Save style={{ width: "1em", marginTop: "-.25em" }} />
                <HideOnLargePhablet> Your </HideOnLargePhablet>Account
              </NavLink>
            )}
          </NavItem>
        )}

        {!props.isMinimal && (
          <NavItem prime right>
            <NavMenu>
              <HideOnMobile>Menu </HideOnMobile>
              <Burger />
            </NavMenu>
          </NavItem>
        )}
      </ul>

      <NavBrandName
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
