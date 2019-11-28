// NOTE: `className` props are used in index.html
import React from "react";
import styled from "styled-components";

import { navLinkStyles } from "./NavLinks";
import Search from "../../../icons/Search";
import SearchButtonIcon from "../../Menu/components/SearchButtonIcon";
import Modal from "../../Modal";

export const NavModal = styled(Modal)`
  ${props => !props.nostyles && navLinkStyles}
`;
export const menuModal = {
  info: {
    menu: true,
    title: (
      <>
        <SearchButtonIcon>
          <Search />
        </SearchButtonIcon>{" "}
        Menu
      </>
    ),
  },
  id: "nav/menu",
};
export default props => (
  <NavModal {...props} unmarked href="/nav/menu" with={menuModal}>
    {props.children}
  </NavModal>
);
