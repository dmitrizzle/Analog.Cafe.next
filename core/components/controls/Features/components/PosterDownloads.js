import React from "react";

import Download from "../../../icons/Download";
import Poster from "./Poster";

const PosterDownloads = ({ activeTag, withinArticle, status }) => {
  return (
    <Poster
      collection={1}
      scroll={withinArticle ? true : false}
      active={"link" === activeTag}
      className="feature-poster"
      to="/apps-and-downloads"
      id={"poster-link"}
      withinArticle={withinArticle ? 1 : 0}
      status={status}
    >
      <figure>
        <div>
          <Download style={{ margin: "0.45em 0.75em", width: "1.3em" }} />
        </div>
      </figure>
      <h4>Apps and Downloads</h4>
    </Poster>
  );
};

export default PosterDownloads;
