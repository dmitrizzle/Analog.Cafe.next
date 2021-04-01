import React from "react";

import { ROUTE_LABELS, ROUTE_TAGS } from "../../../pages/List/constants";
import { makeFroth } from "../../../../../utils/froth";
import Poster from "./Poster";
import ga from "../../../../../utils/data/ga";

export const items = Object.keys(ROUTE_TAGS)
  .filter(url => url !== "/submissions" && url !== "/account" && url !== "/")
  .map(url => {
    return {
      url: url,
      tag: ROUTE_TAGS[url],
      details: ROUTE_LABELS[url],
    };
  });

const PostersTags = ({
  activeTag,
  withinArticle,
  setCollectionDescription,
}) => {
  return items.map(item => {
    const { tag, details, url } = item;

    if (tag === "link" || tag === "editorial") return undefined;

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
            <picture>
              <source
                srcSet={
                  makeFroth({ src: details.poster, size: "t", type: "webp" })
                    .src
                }
                type="image/webp"
              />
              <img
                loading="lazy"
                src={makeFroth({ src: details.poster, size: "t" }).src}
                alt={details.title}
              />
            </picture>
          </div>
        </figure>

        <h4>{details.title}</h4>
      </Poster>
    );
  });
};

export default PostersTags;
