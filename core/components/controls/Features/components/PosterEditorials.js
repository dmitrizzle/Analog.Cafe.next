import React from "react";

import Newspaper from "../../../icons/Newspaper";
import Poster from "./Poster";

const PosterEditorials = ({ activeTag, withinArticle, status }) => {
  return (
    <Poster
      scroll={withinArticle ? true : false}
      collection
      active={"editorial" === activeTag}
      className="feature-poster"
      to="/editorials"
      id={"poster-submissions"}
      withinArticle={withinArticle ? 1 : 0}
      status={status}
    >
      <figure>
        <div>
          <Newspaper
            style={{
              margin: "1.45em 1.3em",
              width: "1.4em",
              display: "block",
            }}
          />
        </div>
      </figure>
      <h4>Community Letters</h4>
    </Poster>
  );
};

export default PosterEditorials;
