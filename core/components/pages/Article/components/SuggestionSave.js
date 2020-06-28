import React from "react";
import styled from "styled-components";

import { paragraph } from "../../../../../constants/styles/typography";
import Bookmark from "../../../icons/Bookmark";
import LinkButton from "../../../controls/Button/components/LinkButton";

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
      <Bookmark
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
        <Bookmark
          style={{
            width: "1em",
            marginTop: "-.35em",
          }}
        />{" "}
        Saved to Bookmarks
      </>
    )}
  </LinkButton>
);
