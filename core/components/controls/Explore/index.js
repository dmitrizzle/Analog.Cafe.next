import React from "react";

export const exploreModal = pathname => {
  return {
    noStar: true,
    title: <># Explore</>,
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
    info: exploreModal(pathname),
    id: "nav/explore",
  };
};
