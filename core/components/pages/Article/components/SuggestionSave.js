import React from "react";
import styled from "styled-components";

import { c_red } from "../../../../../constants/styles/themes";
import { paragraph } from "../../../../../constants/styles/typography";
import Bookmark from "../../../icons/Bookmark";
import LinkButton from "../../../controls/Button/components/LinkButton";

const ButtonQuote = styled.em`
  ${paragraph};
  line-height: 1em;
`;

const SuggestionSave = ({
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
      <Bookmark
        style={{
          height: "1em",
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
        <Bookmark
          style={{
            height: "1em",
          }}
          fill={c_red}
        />{" "}
        Saved to Bookmarks
      </>
    )}
  </LinkButton>
);

export default SuggestionSave;
