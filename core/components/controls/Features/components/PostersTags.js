import React, { useEffect } from "react";

import {
  CLOUDINARY_BASE,
  CLOUDINARY_TRANSFORM,
} from "../../../../../constants/cloudinary";
import { ROUTE_LABELS, ROUTE_TAGS } from "../../../pages/List/constants";
import { centerFeaturedPoster } from "../utils";
import Poster from "./Poster";
import ga from "../../../../../utils/data/ga";

export default ({
  activeTag,
  withinArticle,
  setActivePoster,
  setCollectionDescription,
  startIndex = 1,
  mountEvent,
}) => {
  useEffect(() => {
    if (!process.browser || !activeTag || withinArticle || mountEvent) return;
    const centerDelay = setTimeout(() => {
      clearTimeout(centerDelay);
      centerFeaturedPoster({ activeCollection: activeTag });
    }, 750);
  }, [activeTag]);

  return Object.keys(ROUTE_TAGS).map((url, iterable) => {
    const tag = ROUTE_TAGS[url];
    const details = ROUTE_LABELS[url];
    if (!tag || !details) return null;
    if (url === "/submissions" || url === "/account" || url === "/")
      return null;

    return (
      <Poster
        scroll={withinArticle ? true : false}
        collection
        tag
        active={tag === activeTag}
        key={url}
        to={tag === activeTag ? "/" : url}
        id={`poster-${tag}`}
        withinArticle={withinArticle ? 1 : 0}
        onClick={() => {
          ga("event", {
            category: "nav",
            action: tag === activeTag ? "list.feature.return" : "list.feature",
            label: tag,
          });

          if (tag !== activeTag) {
            setActivePoster(iterable + startIndex);
            setCollectionDescription(details.title);
            centerFeaturedPoster({ activeCollection: tag });
          } else {
            setCollectionDescription();
            setActivePoster();
          }
        }}
        style={{
          background: `url(${CLOUDINARY_BASE +
            CLOUDINARY_TRANSFORM(200, 200) +
            details.poster}.jpg)`,
        }}
      >
        {details.title}
      </Poster>
    );
  });
};
