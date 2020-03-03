import React from "react";
import styled from "styled-components";

import { paragraph } from "../../../../../constants/styles/typography";
import LinkButton from "../../../controls/Button/components/LinkButton";
import Save from "../../../icons/Save";

const ButtonQuote = styled.em`
  ${paragraph};
  line-height: 1em;
`;
export default ({
  handleFavourite,
  isFavourite,
  title,
  coffeeForLeadAuthor,
}) => (
  <LinkButton
    onClick={handleFavourite}
    inverse={isFavourite}
    branded={!isFavourite && !coffeeForLeadAuthor}
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
            ? ` “${title.length > 15 ? title.substr(0, 14) + "…" : title}”`
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
