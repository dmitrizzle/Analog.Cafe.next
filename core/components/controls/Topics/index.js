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
      {
        to: "/apps-and-downloads",
        text: "Downloads",
        inverse: pathname === "/apps-and-downloads",
      },
      ...topicUrls.map(topic =>
        buttonMaker(topic, {
          attributes: {
            inverse: pathname === topic,
          },
        })
      ),
    ],
  };
};

export default pathname => {
  return {
    info: topicsModal(pathname),
    id: "nav/topics",
  };
};
