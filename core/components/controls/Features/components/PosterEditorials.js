import React from "react";

import Envelope from "../../../icons/Envelope";
import Poster from "./Poster";

const PosterEditorials = ({ activeCollection, withinArticle, status }) => {
  return (
    <Poster
      scroll={withinArticle ? true : false}
      collection
      tag
      active={"editorials" === activeCollection}
      className="feature-poster"
      to="/editorials"
      id={"poster-editorials"}
      withinArticle={withinArticle ? 1 : 0}
      status={status}
    >
      <figure>
        <div
          style={{
            filter:
              "invert(69%) sepia(39%) saturate(5236%) hue-rotate(316deg) brightness(92%) contrast(102%)",
          }}
        >
          <Envelope
            style={{
              margin: "1.45em 1.3em",
              width: "1.4em",
              display: "block",
            }}
          />
        </div>
      </figure>
      <h4>Letters and Editorials</h4>
    </Poster>
  );
};

export default PosterEditorials;
