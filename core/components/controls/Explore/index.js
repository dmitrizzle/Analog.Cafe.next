import React from "react";

export const topicsModal = pathname => {
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
    info: topicsModal(pathname),
    id: "nav/topics",
  };
};
