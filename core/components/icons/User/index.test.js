import "jest-styled-components";

import React from "react";

import { mount } from "enzyme";

import { CLOUDINARY_BASE } from "../../../../constants/cloudinary";
import User from "./";

describe("User icon tests", () => {
  it.skip("Has correct dimensions", () => {
    const initialState = { user: { status: "pending" } };
    const icon = mount(<User user={initialState.user} />);
    expect(icon).toHaveStyleRule("width", "12px");
    expect(icon).toHaveStyleRule("height", "12px");
  });
  it.skip("Shows background image when user is logged in", () => {
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
      `url(${CLOUDINARY_BASE}c_scale,fl_progressive,w_80/image-froth_1499813_rkIHh1PYS.jpg)`
    );
  });
});
