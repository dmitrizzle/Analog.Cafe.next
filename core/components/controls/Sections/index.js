import React from "react";

import { buttonMaker } from "../Menu/utils";
import Burger from "../../icons/Burger";

export const topicUrls = ["/collaborations"];

export const sectionsModal = pathname => {
  return {
    noStar: true,
    title: (
      <span>
        <Burger /> Sections
      </span>
    ),
    buttons: [
      {
        to: "/",
        text: "Front Page",
        inverse: pathname === "/",
      },
      {
        to: "/film-photography",
        text: "Everything Film",
        inverse: pathname === "/film-photography",
      },

      {
        to: "/photo-essays",
        text: "Stories, Essays, Opinions",
        inverse: pathname === "/photo-essays",
      },
      ...topicUrls.map(topic =>
        buttonMaker(topic, {
          attributes: {
            inverse: pathname === topic,
          },
        })
      ),
      {
        to: "/editorials",
        text: "Letters & Editorials",
        inverse: pathname === "/editorials",
      },
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
    info: sectionsModal(pathname),
    id: "nav/sections",
  };
};
