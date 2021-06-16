import React from "react";

import Pen from "../../../icons/Pen";
import Poster from "./Poster";

const PosterSubmissions = ({ withinArticle, status }) => {
  return (
    <Poster
      scroll={withinArticle ? true : false}
      collection={1}
      className="feature-poster"
      to={status === "ok" ? "/account/all-submissions" : "/write"}
      id={"poster-submission"}
      withinArticle={withinArticle ? 1 : 0}
    >
      <figure>
        <div>
          <Pen
            style={{
              width: "2em",
              transform: "rotate(90deg)",
              margin: "0.85em 0.35em",
            }}
          />
        </div>
      </figure>
      <h4>Submissions</h4>
    </Poster>
  );
};

export default PosterSubmissions;
