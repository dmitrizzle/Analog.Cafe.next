import React, { useEffect } from "react";

import {
  CLOUDINARY_BASE,
  CLOUDINARY_TRANSFORM,
} from "../../../../../constants/cloudinary";
import { c_red } from "../../../../../constants/styles/colors";
import { centerFeaturedPoster } from "../utils";
import Poster from "./Poster";
import ga from "../../../../../utils/data/ga";

export default ({
  items,
  activeCollection,
  activeArticle,
  activePoster,
  setActivePoster,
  markIsInitialCollectionDescripitonSet,
  isInitialCollectionDescriptionSet,
  setCollectionDescription,
  collectionDescription,
  withinArticle,
  startIndex = 1,
  mountEvent,
}) => {
  useEffect(() => {
    if (!process.browser || !activeCollection || mountEvent) return;
    const centerDelay = setTimeout(() => {
      clearTimeout(centerDelay);
      centerFeaturedPoster({ activeCollection });
    }, 750);
  }, [activeCollection]);

  return items.map((item, iterable) => {
    const isActive =
      (item.collection && item.collection === activeCollection) ||
      (item.slug && item.slug === activeArticle);

    if (
      !isInitialCollectionDescriptionSet &&
      (isActive ||
        (activePoster === iterable + startIndex &&
          collectionDescription !== item.description &&
          item.description))
    ) {
      markIsInitialCollectionDescripitonSet(true);
      setCollectionDescription(item.description);
    }

    //
    let to = item.slug ? `/r/${item.slug}` : "/" + item.url;
    if (item.collection && isActive) to = "/";

    return (
      <Poster
        scroll={!item.collection || withinArticle ? true : false}
        collection={item.collection}
        active={isActive || activePoster === iterable + startIndex}
        key={iterable + startIndex}
        to={to}
        id={"poster-" + (item.collection || item.id)}
        withinArticle={withinArticle ? 1 : 0}
        onClick={() => {
          ga("event", {
            category: "nav",
            action:
              item.collection && isActive
                ? `${withinArticle ? "article" : "list"}.feature.return`
                : `${withinArticle ? "article" : "list"}.feature`,
            label: to,
          });

          if (item.collection && !isActive) {
            setActivePoster(iterable + startIndex);
            setCollectionDescription(item.description);
            centerFeaturedPoster({
              activeCollection: item.collection || item.slug,
            });
          } else if (isActive) {
            setCollectionDescription();
            setActivePoster();
          }
        }}
        style={{
          background: `url(${CLOUDINARY_BASE +
            CLOUDINARY_TRANSFORM(200, 200) +
            item.poster}.jpg)`,
        }}
      >
        {item.collection ? <span style={{ color: c_red }}> ↬ </span> : "“"}
        {item.title}
        {!item.collection && "”"}
      </Poster>
    );
  });
};
