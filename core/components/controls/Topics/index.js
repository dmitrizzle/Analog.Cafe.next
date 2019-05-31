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
        text: "Newest Articles",
        inverse: pathname === "/",
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
