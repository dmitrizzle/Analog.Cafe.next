import "jest-styled-components";

import React from "react";

import { mount } from "enzyme";

import { NavBookmark } from "./ArticleNav";
import { NavLink } from "../../../controls/Nav/components/NavLinks";

describe("NavBookmark tests", () => {
  it("Has the right copy and style when bookmarked", () => {
    const button = mount(<NavBookmark isFavourite />);
    expect(button.find(NavLink)).toHaveStyleRule("color", "#ffffff !important");
    expect(button.find(NavLink)).toHaveStyleRule(
      "background",
      "#2c2c2c !important"
    );
    expect(button.text()).toBe(" Bookmarked");
  });
  it("Has the right copy and style when NOT bookmarked", () => {
    const button = mount(<NavBookmark />);
    expect(button.find(NavLink)).toHaveStyleRule("color", undefined);
    expect(button.find(NavLink)).toHaveStyleRule("background", undefined);
    expect(button.text()).toBe(" Save to Bookmarks");
  });
});
