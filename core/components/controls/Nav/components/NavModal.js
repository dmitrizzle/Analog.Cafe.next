// NOTE: `className` props are used in index.html
import React from "react";
import styled from "styled-components";

import { NAV_BUTTONS } from "../constants";
import { navLinkStyles } from "./NavLinks";
import Burger from "../../../icons/Burger";
import Modal from "../../Modal";

export const NavModal = styled(Modal)`
  ${navLinkStyles}
`;

const iconStyles = { height: ".75em", paddingBottom: ".15em" };

export default props => (
  <NavModal
    {...props}
    unmarked
    with={{
      info: {
        search: true,
        menu: false,
        socialButtons: true,
        title: (
          <span>
            <Burger /> Menu
          </span>
        ),
        buttons: NAV_BUTTONS({
          ...props,
          iconStyles
        })
      },
      id: "nav/find"
    }}
  >
    {props.children}
  </NavModal>
);
