// NOTE: `className` props are used in index.html
import React from "react";
import styled from "styled-components";

import { navLinkStyles } from "./NavLinks";
import Burger from "../../../icons/Burger";
import Modal from "../../Modal";

export const NavModal = styled(Modal)`
  ${navLinkStyles}
`;
// const NavAccountLink = styled(NavLink)`
//   ${accountCss};
// `

const iconStyles = { height: ".75em", paddingBottom: ".15em" };

const NAV_USER = props => [
  {
    to: "/submit",
    text: (
      <span>
        {/* <Pen style={iconStyles} />  */}
        Submissions
      </span>
    )
  },

  {
    to: "/favourites",
    text: (
      <span>
        {/* <Heart style={iconStyles} />  */}
        Favourites
      </span>
    )
  },
  {
    to: `/profile/edit`,
    text: (
      <span>
        {/* <RHCP style={iconStyles} />  */}
        Profile & Settings
      </span>
    )
  }
  // buttonMaker("/sign-out"),
  // props.userRole === "admin"
  //   ? buttonMaker("/admin", { attributes: { branded: true } })
  //   : null
];

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
        buttons: NAV_USER({
          ...props
          // hasDraft: loadTextContent().length > 0
        })
      },
      id: "nav/find"
    }}
  >
    {props.children}
  </NavModal>
);
