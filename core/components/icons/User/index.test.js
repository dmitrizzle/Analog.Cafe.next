import "jest-styled-components";

import React from "react";

import { mount } from "enzyme";
import configureStore from "redux-mock-store";

import User from "./";

describe("User icon tests", () => {
  const middlewares = [];
  const mockStore = configureStore(middlewares);

  it("Has correct dimensions", () => {
    const initialState = { user: { status: "pending" } };
    const icon = mount(<User user={initialState.user} />);
    expect(icon).toHaveStyleRule("width", "12px");
    expect(icon).toHaveStyleRule("height", "12px");
  });
  it("Shows background image when user is logged in", () => {
    const initialState = {
      user: {
        status: "ok",
        info: {
          image: "image-froth_1499813_rkIHh1PYS",
        },
      },
    };
    const icon = mount(<User user={initialState.user} />);
    expect(icon).toHaveStyleRule(
      "background-image",
      `url(https://res.cloudinary.com/analog-cafe/image/upload/c_scale,fl_progressive,w_80/image-froth_1499813_rkIHh1PYS.jpg)`
    );
  });
});
