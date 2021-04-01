import React from "react";

import Download from "../../../icons/Download";
import Envelope from "../../../icons/Envelope";
import Poster from "./Poster";

const PosterEditorials = ({
  activeCollection,
  withinArticle,
  status,
  dispatch,
  setCollectionDescription,
}) => {
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
              "invert(28%) sepia(39%) saturate(5236%) hue-rotate(321deg) brightness(92%) contrast(102%)",
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
