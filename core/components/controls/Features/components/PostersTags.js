import React from "react";

import {
  CLOUDINARY_BASE,
  CLOUDINARY_TRANSFORM,
} from "../../../../../constants/cloudinary";
import { ROUTE_LABELS, ROUTE_TAGS } from "../../../pages/List/constants";
import { centerFeaturedPoster } from "../utils";
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
          centerFeaturedPoster({ activeCollection: tag });
        }}
        style={{
          background: `url(${CLOUDINARY_BASE +
            CLOUDINARY_TRANSFORM(200, 200) +
            details.poster}.jpg)`,
        }}
      >
        {(appendTagsAll.includes(url) ? "All " : "") + details.title}
      </Poster>
    );
  });
};
