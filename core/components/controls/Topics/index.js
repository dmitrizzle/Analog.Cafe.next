import React from "react";

import { buttonMaker } from "../Menu/utils";
import { navIconStyles } from "../Nav";
import { topicUrls } from "./constants";
import Burger from "../../icons/Burger";
import RHCP from "../../icons/RHCP";

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
        text: "Homepage | Everything",
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
