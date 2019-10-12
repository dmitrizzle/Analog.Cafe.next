import React from "react";

import { buttonMaker } from "../Menu/utils";
import { topicUrls } from "./constants";
import Burger from "../../icons/Burger";

export const topicsModal = pathname => {
  return {
    noStar: true,
    title: (
      <span>
        <Burger /> Topics
      </span>
    ),
    buttons: [
      {
        to: "/",
        text: "Analog.Cafe",
        branded: pathname !== "/",
        inverse: pathname === "/",
      },
      ...topicUrls.map(topic =>
        buttonMaker(topic, {
          attributes: {
            inverse: pathname === topic,
          },
        })
      ),
      {
        to: "/links-and-downloads",
        text: "Links & Downloads",
        inverse: pathname === "/links-and-downloads",
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
