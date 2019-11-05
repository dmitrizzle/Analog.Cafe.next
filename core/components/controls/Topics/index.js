import React from "react";

import { buttonMaker } from "../Menu/utils";

// export const topicUrls = ["/collaborations"];

export const topicsModal = pathname => {
  return {
    noStar: true,
    title: <># Topics</>,
    buttons: [
      {
        to: "/",
        text: "Front Page",
        inverse: pathname === "/",
      },
      {
        to: "/film-photography",
        text: "Everything FILM",
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

      // ...topicUrls.map(topic =>
      //   buttonMaker(topic, {
      //     attributes: {
      //       inverse: pathname === topic,
      //     },
      //   })
      // ),
      {
        to: "/printables-and-downloads",
        text: "Printable Guides & Articles",
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
