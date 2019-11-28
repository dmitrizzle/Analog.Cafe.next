import { connect } from "react-redux";
import { withRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

import {
  HideOnLargePhablet,
  HideOnPhablet,
} from "../../vignettes/HideOnScreenSize";
import { NAME } from "../../../../constants/messages/system";
import { NavLink } from "./components/NavLinks";
import { ROUTE_LABELS } from "../../pages/List/constants";
import { c_red, c_white } from "../../../../constants/styles/colors";
import { NAV_MIN_MAP } from "../../../../constants/router/breadcrumbs";
import { setModal } from "../../../store/actions-modal";
import ArrowReturn from "../../icons/ArrowReturn";
import NavBrandName from "./components/NavBrandName";
import NavItem from "./components/NavItem";
import NavLogo from "./components/NavLogo";
import NavMenu, { menuModal } from "./components/NavMenu";
import NavWrapper from "./components/NavWrapper";
import User from "../../icons/User";
import accountModal from "../YourAccount";
import Search from "../../icons/Search";
import SearchButtonIcon from "../Menu/components/SearchButtonIcon";

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
const ShopLabelLink = styled(NavLink)`
  span {
    color: ${c_red};
  }
  :active span,
  :focus span {
    color: ${c_white};
  }
`;

const Nav = props => {
  const { asPath, query, pathname } = props.router;
  const homepage = pathname === "/";

  const routerEvents = props.router.events;

  const [shouldAnimateFade, setAnimationRule] = useState(false);

  const isCancelled = React.useRef(false); // when component is unmounted

  const collection = props.router.query.collection;

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

  const upTree = path => {
    let match =
      NAV_MIN_MAP[
        Object.keys(NAV_MIN_MAP).filter(key => path.includes(key))[0]
      ];
    // exception
    if (path === "/write/draft" && props.user.status === "ok")
      match = "/account";
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
          <>
            <NavItem>
              <HideOnPhablet>
                <ShopLabelLink href="https://www.etsy.com/shop/FilmBase">
                  Etsy <span>Shop</span>
                </ShopLabelLink>
              </HideOnPhablet>
            </NavItem>
          </>
        )}

        {!props.isMinimal && (
          <NavItem>
            <NavLink href="/about">About</NavLink>
          </NavItem>
        )}

        {!props.isMinimal ? (
          <NavItem prime center>
            <NavLink href="/">
              <NavLogo />
            </NavLink>
          </NavItem>
        ) : (
          <NavItem
            prime
            center
            title={`Back to ${upTree(props.router.asPath)}`}
          >
            <NavLogoSwap
              style={props.isHidden ? { display: "none" } : {}}
              href="/"
              onClick={event => {
                event.preventDefault();
                props.router.push(upTree(props.router.asPath));
              }}
            >
              <ArrowReturn />
            </NavLogoSwap>
          </NavItem>
        )}

        {!props.isMinimal && (
          <NavItem prime left>
            <NavLink
              data-cy="NavLinkMenu"
              href={
                props.user.status === "ok" ? "/nav/your-account" : "/sign-in"
              }
              onClick={event => {
                if (props.user.status === "ok") {
                  event.preventDefault();
                  props.setModal(accountModal(props));
                }
              }}
            >
              <HideOnLargePhablet>Your </HideOnLargePhablet>Account <User />
            </NavLink>
          </NavItem>
        )}

        {!props.isMinimal && (
          <NavItem prime right>
            <NavMenu data-cy="NavLinkMenu">
              Menu{" "}
              <SearchButtonIcon>
                <Search />
              </SearchButtonIcon>
            </NavMenu>
          </NavItem>
        )}
      </ul>

      <NavBrandName
        data-cy="NavBrandName"
        correctedWidth={
          query && query.filter
            ? ROUTE_LABELS["/" + query.filter] &&
              ROUTE_LABELS["/" + query.filter].width
            : homepage || props.showBrandName
            ? (ROUTE_LABELS[asPath] && ROUTE_LABELS[asPath].width) || "6.5em"
            : 0
        }
        collection={collection}
        scroll={false}
        to={collection ? "/" + props.router.query.filter : "/nav/menu"}
        onClick={event => {
          if (
            !collection &&
            (homepage || asPath === "/printables-and-downloads") &&
            props.showBrandName
          ) {
            event.preventDefault();
            props.setModal(menuModal);
          }
        }}
      >
        <span>
          {query && query.filter
            ? ROUTE_LABELS["/" + query.filter] &&
              ROUTE_LABELS["/" + query.filter].title
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
