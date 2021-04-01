import React from "react";

import Download from "../../../icons/Download";
import Poster from "./Poster";

const PosterDownloads = ({ activeCollection, withinArticle, status }) => {
  return (
    <Poster
      scroll={withinArticle ? true : false}
      collection
      tag
      active={"downloads" === activeCollection}
      className="feature-poster"
      to="/apps-and-downloads"
      id={"poster-downloads"}
      withinArticle={withinArticle ? 1 : 0}
      status={status}
    >
      <figure>
        <div>
          <Download style={{ margin: "0.95em 1.365em", width: "1.3em" }} />
        </div>
      </figure>
      <h4>Apps and Downloads</h4>
    </Poster>
  );
};

export default PosterDownloads;
