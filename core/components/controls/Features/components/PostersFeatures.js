import React from "react";

import {
  CLOUDINARY_BASE,
  CLOUDINARY_TRANSFORM,
} from "../../../../../constants/cloudinary";
import Poster from "./Poster";
import ga from "../../../../../utils/data/ga";

export default ({
  items,
  activeCollection,
  activeArticle,
  setCollectionDescription,
  withinArticle,
  startIndex = 1,
}) => {
  return items.map((item, iterable) => {
    const isActive =
      (item.collection && item.collection === activeCollection) ||
      (item.slug && item.slug === activeArticle);

    //
    const to = item.slug ? `/r/${item.slug}` : "/" + item.url;

    return (
      <Poster
        scroll={!item.collection || withinArticle ? true : false}
        collection={item.collection}
        active={isActive}
        key={iterable + startIndex}
        to={to}
        id={"poster-" + (item.collection || item.id)}
        withinArticle={withinArticle ? 1 : 0}
        onClick={() => {
          ga("event", {
            category: "nav",
            action: `${withinArticle ? "article" : "list"}.feature`,
            label: to,
          });

          setCollectionDescription(item.description);
        }}
      >
        <div>
          <div
            style={{
              background: `url(${CLOUDINARY_BASE +
                CLOUDINARY_TRANSFORM(200, 200) +
                item.poster}.jpg)`,
            }}
          />
        </div>

        <h4>
          {!item.collection && "“"}
          {item.title}
          {!item.collection && "”"}
        </h4>
      </Poster>
    );
  });
};
