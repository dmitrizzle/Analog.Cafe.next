import React from "react";
import Burger from "../../icons/Burger";

export const menuModal = props => {
  const pathname = props && props.router ? props.router.asPath : null;
  const user = props && props.user ? props.user : { status: null };
  return {
    noStar: true,
    socialButtons: true,
    title: (
      <>
        <Burger /> Menu
      </>
    ),
    buttons: [
      { divider: pathname !== "/account" },
      {
        to: "/account",
        text: "Your Account",
        inverse: pathname === "/account",
      },
      {
        to: "/printables-and-downloads",
        text: "Downloads",
        inverse: pathname === "/printables-and-downloads",
      },
      user.status === "ok"
        ? {
            to: "/account/all-submissions",
            text: "Your Submissions",
            inverse: pathname === "/account/all-submissions",
          }
        : {
            to: "/write",
            text: "Submissions",
            inverse: pathname === "/write",
          },

      user.status === "ok"
        ? {
            to: "/write/compose",
            text: "Composer App",
            inverse: pathname === "/write/compose",
          }
        : undefined,
      user.status === "ok"
        ? {
            to: "/sign-out",
            text: "Sign Out",
            inverse: pathname === "/sign-out",
          }
        : undefined,
      {
        divider: pathname !== "/write" || user.status === "ok",
      },
      {
        to: "/about",
        text: "About",
        inverse: pathname === "/about",
      },
      {
        to: "/write/rules",
        text: "Rules",
        inverse: pathname === "/write/rules",
      },
      {
        to: "/privacy-policy",
        text: "Privacy Policy",
        inverse: pathname === "/privacy-policy",
      },
      // {
      //   to: "https://www.etsy.com/shop/FilmBase",
      //   text: "Etsy Shop",
      // },
    ],
  };
};

export default pathname => {
  return {
    info: menuModal(pathname),
    id: "nav/menu",
  };
};
