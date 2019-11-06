// NOTE: `className` props are used in index.html
import React from "react";
import styled from "styled-components";

import { navLinkStyles } from "./NavLinks";
import Search from "../../../icons/Search";
import SearchButtonIcon from "../../Explore/components/SearchButtonIcon";
import Modal from "../../Modal";

export const NavModal = styled(Modal)`
  ${props => !props.nostyles && navLinkStyles}
`;
export const exploreModal = {
  info: {
    explore: true,
    title: (
      <>
        <SearchButtonIcon>
          <Search />
        </SearchButtonIcon>{" "}
        Explore
      </>
    ),
  },
  id: "nav/explore",
};
export default props => (
  <NavModal {...props} unmarked href="/nav/explore" with={exploreModal}>
    {props.children}
  </NavModal>
);
