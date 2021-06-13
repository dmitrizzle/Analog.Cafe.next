import React from "react";

import { makeFroth } from "../../../../../utils/froth";
import Poster from "./Poster";
import ga from "../../../../../utils/data/ga";

const PostersFeatures = ({
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
        <figure>
          <div>
            <picture>
              <source
                srcSet={
                  makeFroth({ src: item.poster, size: "t", type: "avif" }).src
                }
                alt={item.description}
                type="image/avif"
              />
              <source
                srcSet={
                  makeFroth({ src: item.poster, size: "t", type: "webp" }).src
                }
                alt={item.description}
                type="image/webp"
              />
              <img
                loading="lazy"
                src={makeFroth({ src: item.poster, size: "t" }).src}
                alt={item.title}
              />
            </picture>
          </div>
        </figure>

        <h4>
          {!item.collection && "“"}
          {item.title}
          {!item.collection && "”"}
        </h4>
      </Poster>
    );
  });
};

export default PostersFeatures;
