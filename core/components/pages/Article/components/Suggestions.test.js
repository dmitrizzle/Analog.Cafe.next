import "jest-styled-components";

import React from "react";

import { mount } from "enzyme";

import LinkButton from "../../../controls/Button/components/LinkButton";
import SuggestionSave from "./SuggestionSave";

describe("SuggestionSave tests", () => {
  it.skip("Has the right copy and style when bookmarked", () => {
    const button = mount(<SuggestionSave isFavourite />);
    expect(button.find(LinkButton)).toHaveStyleRule(
      "color",
      "#ffffff !important"
    );
    expect(button.find(LinkButton)).toHaveStyleRule("background", "#2c2c2c");
    expect(button.text()).toBe(" Saved to Bookmarks");
  });
  it.skip("Has the right copy and style when NOT bookmarked", () => {
    const button = mount(<SuggestionSave />);
    expect(button.find(LinkButton)).toHaveStyleRule(
      "color",
      "#2c2c2c !important"
    );
    expect(button.find(LinkButton)).toHaveStyleRule("background", "#ffffff");
    expect(button.text()).toBe(" Save to Bookmarks");
  });
});
