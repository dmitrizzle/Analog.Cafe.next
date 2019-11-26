import "jest-styled-components";

import React from "react";

import { mount } from "enzyme";

import { NavBookmark, FixedSubNavSpan, FixedSubNav } from "./ArticleNav";
import { NavLink } from "../../../controls/Nav/components/NavLinks";

describe("NavBookmark tests", () => {
  it("Has the right copy and style when bookmarked", () => {
    const button = mount(<NavBookmark isFavourite />);
    expect(button.text()).toBe("Bookmarked");
  });
  it("Has the right copy and style when NOT bookmarked", () => {
    const button = mount(<NavBookmark />);
    expect(button.find(NavLink)).toHaveStyleRule("color", "#ffffff !important");
    expect(button.find(NavLink)).toHaveStyleRule(
      "background",
      "#03a9f4 !important"
    );
    expect(button.text()).toBe(" Save to Bookmarks");
  });
});
describe("FixedNav tests", () => {
  it("FixedSubNavSpan has the right styles", () => {
    const element = mount(<FixedSubNavSpan />);
    expect(element).toHaveStyleRule("display", "flex");
    expect(element).toHaveStyleRule("justify-content", "center");
  });
  it("FixedSubNav has the right styles", () => {
    const element = mount(<FixedSubNav fixedPosition />);
    expect(element).toHaveStyleRule("position", "fixed");
    expect(element).toHaveStyleRule("z-index", "11");
  });
});
