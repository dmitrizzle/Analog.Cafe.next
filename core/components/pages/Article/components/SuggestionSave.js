import React from "react";
import styled from "styled-components";

import { paragraph } from "../../../../../constants/styles/typography";
import LinkButton from "../../../controls/Button/components/LinkButton";
import Save from "../../../icons/Save";

// TODO:
// - open modal when removing bookmark with option to see all bookmarks
// - fix blinking "latest" poster every time save button is clicked

const ButtonQuote = styled.em`
  ${paragraph};
  line-height: 1em;
`;
export default ({ handleFavourite, isFavourite, title }) => (
  <LinkButton
    onClick={handleFavourite}
    inverse={isFavourite}
    branded={!isFavourite}
  >
    {!isFavourite && (
      <Save
        style={{
          width: "1em",
          marginTop: "-.35em",
        }}
      />
    )}{" "}
    {!isFavourite ? (
      <>
        Bookmark
        <ButtonQuote>
          {title
            ? ` “${title.length > 20 ? title.substr(0, 19) + "…" : title}”`
            : ""}
        </ButtonQuote>
      </>
    ) : (
      <>
        <Save
          style={{
            width: "1em",
            marginTop: "-.35em",
          }}
        />{" "}
        Saved to Your Bookmarks
      </>
    )}
  </LinkButton>
);
