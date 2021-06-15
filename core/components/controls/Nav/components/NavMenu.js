// NOTE: `className` props are used in index.html
import React from "react";
import styled from "styled-components";

import { navLinkStyles } from "./NavLinks";
import Burger from "../../../icons/Burger";
import Modal from "../../Modal";

export const NavModal = styled(Modal)`
  ${props => !props.nostyles && navLinkStyles}
`;
export const menuModal = {
  info: {
    menu: true,
    ad: true,
    title: <>More…</>,
  },
  id: "nav/menu",
};

const NavMenu = props => (
  <NavModal {...props} unmarked href="/nav/menu" with={menuModal}>
    {props.children}
  </NavModal>
);

export default NavMenu;
