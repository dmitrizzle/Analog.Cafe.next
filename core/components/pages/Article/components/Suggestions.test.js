import "jest-styled-components";

import React from "react";

import { mount } from "enzyme";

import { SaveToBookmarks } from "./Suggestions";
import LinkButton from "../../../controls/Button/components/LinkButton";

describe("SaveToBookmarks tests", () => {
  it("Has the right copy and style when bookmarked", () => {
    const button = mount(<SaveToBookmarks isFavourite />);
    expect(button.find(LinkButton)).toHaveStyleRule(
      "color",
      "#ffffff !important"
    );
    expect(button.find(LinkButton)).toHaveStyleRule("background", "#2c2c2c");
    expect(button.text()).toBe(" Bookmarked");
  });
  it("Has the right copy and style when NOT bookmarked", () => {
    const button = mount(<SaveToBookmarks />);
    expect(button.find(LinkButton)).toHaveStyleRule(
      "color",
      "#2c2c2c !important"
    );
    expect(button.find(LinkButton)).toHaveStyleRule("background", "#ffffff");
    expect(button.text()).toBe(" Save to Bookmarks");
  });
});
