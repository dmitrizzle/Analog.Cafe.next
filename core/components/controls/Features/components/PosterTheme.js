import React from "react";

import { capitalizeFirstLetter } from "../../../../../utils/string";
import Poster from "./Poster";
import Sun from "../../../icons/Sun";

const PosterTheme = ({ withinArticle, theme, toggleTheme }) => {
  return (
    <Poster
      scroll={withinArticle ? true : false}
      collection={1}
      className="feature-poster"
      to={"#dark-mode"}
      id={"poster-theme"}
      withinArticle={withinArticle ? 1 : 0}
      onClick={event => {
        event.preventDefault();
        toggleTheme();
      }}
    >
      <figure>
        <div>
          <Sun
            style={{
              width: "1.25em",
            }}
          />
        </div>
      </figure>
      <h4>{capitalizeFirstLetter(theme)}</h4>
    </Poster>
  );
};

export default PosterTheme;
