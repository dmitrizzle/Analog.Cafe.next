import React from "react";

import Pen from "../../../icons/Pen";
import Poster from "./Poster";

const PosterSubmissions = ({ activeTag, withinArticle, status }) => {
  return (
    <Poster
      scroll={withinArticle ? true : false}
      collection
      className="feature-poster"
      to={status === "ok" ? "/account/all-submissions" : "/write"}
      id={"poster-submissions"}
      withinArticle={withinArticle ? 1 : 0}
    >
      <figure>
        <div>
          <Pen
            style={{
              width: "2em",
              transform: "rotate(90deg)",
              margin: "1.5em 1em",
            }}
          />
        </div>
      </figure>
      <h4>Submissions</h4>
    </Poster>
  );
};

export default PosterSubmissions;
