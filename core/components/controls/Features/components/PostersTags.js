import React from "react";

import { ROUTE_LABELS, ROUTE_TAGS } from "../../../pages/List/constants";
import { makeFroth } from "../../../../../utils/froth";
import Poster from "./Poster";
import ga from "../../../../../utils/data/ga";

const appendTagsAll = [
  "/photo-essays",
  "/film-photography",
  "/apps-and-downloads",
];

export const items = Object.keys(ROUTE_TAGS)
  .filter(url => url !== "/submissions" && url !== "/account" && url !== "/")
  .map(url => {
    return {
      url: url,
      tag: ROUTE_TAGS[url],
      details: ROUTE_LABELS[url],
    };
  });

export default ({ activeTag, withinArticle, setCollectionDescription }) => {
  return items.map(item => {
    const { tag, details, url } = item;

    return (
      <Poster
        scroll={withinArticle ? true : false}
        collection
        tag
        active={tag === activeTag}
        key={url}
        to={url}
        id={`poster-${tag}`}
        withinArticle={withinArticle ? 1 : 0}
        onClick={() => {
          ga("event", {
            category: "nav",
            action: "list.feature",
            label: tag,
          });

          setCollectionDescription(details.title);
        }}
      >
        <figure>
          <div>
            <img
              loading="lazy"
              src={makeFroth({ src: details.poster, size: "t" }).src}
              alt={details.title}
            />
          </div>
        </figure>

        <h4>{(appendTagsAll.includes(url) ? "All " : "") + details.title}</h4>
      </Poster>
    );
  });
};
