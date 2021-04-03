import React from "react";

import { capitalizeFirstLetter } from "../../../../../utils/string";
import Moon from "../../../icons/Moon";
import Poster from "./Poster";

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
          <Moon
            style={{
              width: "1.25em",
            }}
          />
        </div>
      </figure>
      <h4>Theme — {capitalizeFirstLetter(theme)}</h4>
    </Poster>
  );
};

export default PosterTheme;
