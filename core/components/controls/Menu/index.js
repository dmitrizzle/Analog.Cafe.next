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
            to: "/submit",
            text: "Submissions",
            inverse: pathname === "/submit",
          },

      user.status === "ok"
        ? {
            to: "/submit/compose",
            text: "Composer App",
            inverse: pathname === "/submit/compose",
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
        divider: pathname !== "/submit" || user.status === "ok",
      },
      {
        to: "/about",
        text: "About",
        inverse: pathname === "/about",
      },
      {
        to: "/submit/rules",
        text: "Rules",
        inverse: pathname === "/submit/rules",
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
