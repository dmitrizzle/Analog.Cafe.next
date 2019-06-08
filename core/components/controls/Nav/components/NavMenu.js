// NOTE: `className` props are used in index.html
import React from "react";
import styled from "styled-components";

import { navLinkStyles } from "./NavLinks";
import Burger from "../../../icons/Burger";
import Modal from "../../Modal";

export const NavModal = styled(Modal)`
  ${props => !props.nostyles && navLinkStyles}
`;

const iconStyles = { height: ".75em", paddingBottom: ".15em" };

export default props => (
  <NavModal
    {...props}
    unmarked
    with={{
      info: {
        menu: true,
        socialButtons: true,
        title: (
          <span>
            <Burger /> Menu
          </span>
        ),
      },
      id: "nav/menu",
    }}
  >
    {props.children}
  </NavModal>
);
