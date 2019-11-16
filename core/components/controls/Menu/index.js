import React from "react";
import Burger from "../../icons/Burger";
import Search from "../../icons/Search";
import SearchButtonIcon from "../Explore/components/SearchButtonIcon";
import { exploreModal } from "../Nav/components/NavExplore";

export const menuModal = props => {
  const pathname = props && props.router ? props.router.asPath : null;
  const user = props && props.user ? props.user : { status: null };
  return {
    noStar: true,
    title: (
      <>
        <Burger /> Menu
      </>
    ),
    buttons: [
      {
        to: "/account",
        text: "Your Account",
        active: pathname === "/account",
      },
      user.status === "ok"
        ? {
            to: "/account/all-submissions",
            text: "Your Submissions",
            active: pathname === "/account/all-submissions",
          }
        : {
            to: "/write",
            text: "Submissions",
            active: pathname === "/write",
          },

      user.status === "ok"
        ? {
            to: "/write/draft",
            text: "Composer App",
            active: pathname === "/write/draft",
          }
        : undefined,
      {
        to: "/printables-and-downloads",
        text: "Downloads",
        active: pathname === "/printables-and-downloads",
      },
      user.status === "ok"
        ? {
            to: "/sign-out",
            text: "Sign Out",
            active: pathname === "/sign-out",
          }
        : undefined,
      {
        divider: pathname !== "/write" || user.status === "ok",
      },

      {
        to: "/about",
        text: "About",
        active: pathname === "/about",
      },
      {
        to: "/write/rules",
        text: "Rules",
        active: pathname === "/write/rules",
      },
      {
        to: "/privacy-policy",
        text: "Privacy Policy",
        active: pathname === "/privacy-policy",
      },

      // {
      //   to: "https://www.etsy.com/shop/FilmBase",
      //   text: "Etsy Shop",
      // },
      { socialButtons: true },
      { divider: true },
      {
        mobile: "on",
        to: "/nav/explore",
        onClick: event => {
          if (props.router) {
            // if no router present in props, most likely the menu is to be displayed
            // as a sandalone page on /nav/menu - so none of the below actions are helpful
            event.preventDefault();
            event.stopPropagation();
            props.setModal(exploreModal);
          }
        },

        text: (
          <>
            Explore{" "}
            <SearchButtonIcon inverse>
              <Search />
            </SearchButtonIcon>
          </>
        ),
      },
    ],
  };
};

export default pathname => {
  return {
    info: menuModal(pathname),
    id: "nav/menu",
  };
};
