import { connect } from "react-redux";
import { withRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";

import { NAME } from "../../../../constants/messages/system";
import { NavLink } from "./components/NavLinks";
import { ROUTE_LABELS } from "../../pages/List/constants";
import { b_mobile, b_phablet } from "../../../../constants/styles/measurements";
import { setModal } from "../../../store/actions-modal";
import Burger from "../../icons/Burger";
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
export const ShowOnPhablet = styled.span`
  @media (min-width: ${b_phablet}) {
    display: none;
  }
`;
export const navIconStyles = { height: ".75em", paddingBottom: ".15em" };

const Nav = props => {
  const { asPath, query, pathname } = props.router;
  const homepage = pathname === "/";

  const routerEvents = props.router.events;

  const [isDoneLoading, setLoadingState] = useState(false);
  routerEvents.on("routeChangeStart", () => {
    setLoadingState(false);
  });

  const isCancelled = React.useRef(false);
  React.useEffect(() => {
    return () => {
      isCancelled.current = true;
    };
  }, []);

  routerEvents.on("routeChangeComplete", () => {
    if (window.scrollY < 160) return;
    setLoadingState(true);
    const loadingStateTimeout = window.setTimeout(() => {
      clearTimeout(loadingStateTimeout);
      if (!isCancelled.current) setLoadingState(false);
    }, 500);
  });

  return (
    <NavWrapper tallMargin={props.tallMargin} isDoneLoading={isDoneLoading}>
      {!props.hideHeader && (
        <ul>
          {!props.isMinimal && (
            <NavItem prime left>
              {props.user.status !== "ok" ? (
                <NavLink href="/submit" prefetch>
                  Sub<HideOnPhablet>missions</HideOnPhablet>
                  <ShowOnPhablet>
                    <HideOnMobile>mit</HideOnMobile>
                  </ShowOnPhablet>
                </NavLink>
              ) : (
                <NavLink href="/account">
                  <HideOnPhablet>Your </HideOnPhablet>Acc
                  <HideOnMobile>oun</HideOnMobile>t
                </NavLink>
              )}
            </NavItem>
          )}

          {!props.isMinimal && (
            <NavItem>
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

          <NavItem prime center>
            <NavLink
              href="/"
              prefetch
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

          {!props.isMinimal && (
            <NavItem>
              <NavLink href="/about" prefetch>
                About
              </NavLink>
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
      )}
      <NavBrandName
        correctedWidth={
          query && query.filter
            ? ROUTE_LABELS["/" + query.filter].width
            : homepage || props.showBrandName
            ? (ROUTE_LABELS[asPath] && ROUTE_LABELS[asPath].width) || "6.5em"
            : 0
        }
        onClick={() => {
          (homepage || asPath === "/features") &&
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
