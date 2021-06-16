import React from "react";

import Newspaper from "../../../icons/Newspaper";
import Poster from "./Poster";

const PosterEditorials = ({ activeTag, withinArticle, status }) => {
  return (
    <Poster
      collection={1}
      scroll={withinArticle ? true : false}
      active={"editorial" === activeTag}
      className="feature-poster"
      to="/editorials"
      id={"poster-editorial"}
      withinArticle={withinArticle ? 1 : 0}
      status={status}
    >
      <figure>
        <div>
          <Newspaper
            style={{
              margin: "0.85em 0.7em",
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
