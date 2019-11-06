import React from "react";
import Burger from "../../icons/Burger";

export const menuModal = pathname => {
  return {
    noStar: true,
    title: (
      <>
        <Burger /> Menu
      </>
    ),
    buttons: [
      {
        to: "/film-photography",
        text: "Film, Photography, Cameras",
        inverse: pathname === "/film-photography",
      },
      {
        to: "/photo-essays",
        text: "Stories, Essays, Opinions",
        inverse: pathname === "/photo-essays",
      },
      {
        to: "/editorials",
        text: "Letters & Editorials",
        inverse: pathname === "/editorials",
      },
      {
        to: "/printables-and-downloads",
        text: "Printable Guides & Downloads",
        inverse: pathname === "/printables-and-downloads",
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
