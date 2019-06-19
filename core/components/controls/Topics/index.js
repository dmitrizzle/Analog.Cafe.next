import React from "react";
import styled from "styled-components";

import { buttonMaker } from "../Menu/utils";
import { c_red } from "../../../../constants/styles/colors";
import { topicUrls } from "./constants";
import Burger from "../../icons/Burger";

const LogoShadow = styled.span`
  border-radius: 0.15em;
  transform: rotate(45deg);
  display: inline-block;
  width: 0.75em;
  height: 0.75em;
  margin: -0.5em 4px -0.05em;
  background: ${c_red};
`;

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
        text: (
          <span style={{ marginLeft: "-1em" }}>
            <LogoShadow /> Everything
          </span>
        ),
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
