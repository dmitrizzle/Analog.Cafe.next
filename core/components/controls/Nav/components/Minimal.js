import { connect } from "react-redux";
import { withRouter } from "next/router";
import React from "react";

import { NAME } from "../../../../../constants/messages/app";
import { NavLink } from "./NavLinks";
import { setModal } from "../../../../store/actions-modal";
import NavBrandName from "./NavBrandName";
import NavItem from "./NavItem";
import NavLogo from "./NavLogo";
import NavWrapper from "./NavWrapper";

const NavMinimal = props => {
  return (
    <NavWrapper>
      <ul>
        <NavItem prime center>
          <NavLink href="/" prefetch>
            <NavLogo />
          </NavLink>
        </NavItem>
      </ul>
      <NavBrandName homepage={props.router.pathname === "/"}>
        {NAME}
      </NavBrandName>
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
  )(NavMinimal)
);
