import LazyLoad from "react-lazyload";
import React, { useState, useEffect } from "react";
import Router from "next/router";

import { AuthorsPrinted } from "../../Article/components/AuthorsPrinted";
import {
  DocketResponsive,
  DocketResponsiveImage,
  DocketResponsiveInfo,
} from "./DocketResponsive";
import { LabelWrap } from "../../../controls/Docket";
import { ROUTE_TAGS, ROUTE_LABELS } from "../constants";
import { c_black_a25 } from "../../../../../constants/styles/colors";
import {
  getHumanDatestamp,
  isXWeeksAgo,
  readType,
  readingTime,
} from "../../../../../utils/time";
import { getTitleFromSlug } from "../../../../../utils/url";
import { makeFroth } from "../../../../../utils/froth";
import Bleed from "./Bleed";
import Label from "../../../vignettes/Label";
import Link from "../../../controls/Link";
import ListUL from "./ListUL";
import ZigZagPicture from "./ZigZagPicture";
import ga from "../../../../../utils/data/ga";

const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export default props => {
  const [isListLoading, setIsListLoading] = useState(false);
  let isMounted = true;

  Router.events.on("routeChangeStart", path => {
    // if loading article, don't trigger list effects
    if (path.includes("/r/")) return;
    isMounted && setIsListLoading(true);
  });
  Router.events.on("routeChangeComplete", path => {
    // if loading article, don't trigger list effects
    if (path.includes("/r/")) return;
    isMounted && setIsListLoading(false);
  });
  useEffect(() => {
    return () => {
      isMounted = false;
    };
  });

  return (
    <Bleed>
      <ListUL status={props.status} author={props.author} data-cy="ListBlock">
        {props.items.map((item, index) => {
          // NOTE: index is used to show high quality image for first item only

          let title = item.title;
          let subtitle = item.subtitle;
          const collectionName = props.router.query.collection;
          const collection =
            collectionName && item.collections
              ? item.collections[collectionName]
              : undefined;
          if (item.collections && collection && collection.as) {
            title = collection.as.title || title;
            subtitle = collection.as.subtitle || subtitle;
          }

          const novelty =
            item.date && item.date.published && item.type !== "placeholder"
              ? {
                  isNew:
                    item.type !== "placeholder"
                      ? isXWeeksAgo(item.date.published) === 0
                      : null,
                  isNewlyEdited:
                    item.type !== "placeholder"
                      ? isXWeeksAgo(item.date.updated) === 0
                      : null,
                  isOldAndNewlyEdited:
                    isXWeeksAgo(item.date.published) > 0 &&
                    item.date.published < item.date.updated,
                }
              : {};

          const readingTimeMinutes = readingTime(item.stats);

          const link =
            item.slug &&
            (props.private && !props.bookmarks ? "/account/submission" : "/r") +
              "/" +
              item.slug;

          return (
            <li
              key={item.id + index}
              onClick={() => {
                // eslint-disable-next-line
                let label;
                if (novelty.isNew && !novelty.read) label = "new";
                else if (novelty.isOldAndNewlyEdited && !novelty.read)
                  label = "updated";
                else label = undefined;

                ga("event", {
                  category: "nav",
                  action: "list.item",
                  label,
                });
              }}
              style={{
                opacity: isListLoading ? 0.5 : 1,
              }}
            >
              <DocketResponsive to={link}>
                <LazyLoad
                  height={"7.5em"}
                  once
                  offset={300}
                  key={item.id + index}
                >
                  <DocketResponsiveImage
                    style={{ boxShadow: `${c_black_a25} 0 0 4em inset ` }}
                    tag={item.tag}
                    src={item.poster}
                    center
                  />
                </LazyLoad>

                <DocketResponsiveInfo>
                  <h4>{title}</h4>
                  <small>
                    {subtitle && (
                      <em>
                        {subtitle}
                        <br />
                      </em>
                    )}
                    <br />
                    {item.type !== "placeholder" && item.tag !== "link" && (
                      <em>
                        {item.stats &&
                          capitalizeFirstLetter(
                            readType(item.stats.images, readingTimeMinutes)
                          )}{" "}
                        read with {item.stats.images} image
                        {item.stats.images > 1 && "s"} by{" "}
                        <AuthorsPrinted authors={item.authors} limit={3} />. It
                        was published on{" "}
                        {item.date && getHumanDatestamp(item.date.published)}{" "}
                        and will take about {item.stats && readingTimeMinutes}{" "}
                        minute
                        {readingTimeMinutes > 1 && "s"} to ingest.
                      </em>
                    )}
                    {item.type !== "placeholder" && item.tag === "link" && (
                      <em>{item.summary}</em>
                    )}
                  </small>
                </DocketResponsiveInfo>
              </DocketResponsive>

              <Link
                to={Object.keys(ROUTE_TAGS).find(
                  key => ROUTE_TAGS[key] === item.tag
                )}
              >
                <LabelWrap list={1}>
                  {item.stats && item.type !== "placeholder" && (
                    <Label
                      inverse={item.tag !== "link"}
                      blue={item.tag === "link"}
                      pointer
                    >
                      {item.tag
                        ? ROUTE_LABELS[
                            Object.keys(ROUTE_TAGS).find(
                              key => ROUTE_TAGS[key] === item.tag
                            )
                          ] &&
                          ROUTE_LABELS[
                            Object.keys(ROUTE_TAGS).find(
                              key => ROUTE_TAGS[key] === item.tag
                            )
                          ].title
                        : "Submission"}
                    </Label>
                  )}
                  {item.authors && item.authors.length > 1 && (
                    <Label>Collaboration</Label>
                  )}
                  {(novelty.isNew || novelty.isNewlyEdited) &&
                    !novelty.read && (
                      <Label branded>
                        {novelty.isOldAndNewlyEdited ? "Updated" : "New!"}
                      </Label>
                    )}
                  {item.status !== "published" && (
                    <Label blue>{getTitleFromSlug(item.status)}</Label>
                  )}
                </LabelWrap>
              </Link>

              <LazyLoad once offset={300} key={item.id + index}>
                <ZigZagPicture
                  className="film-leader"
                  index={index}
                  tag={item.tag}
                  style={{
                    backgroundImage: `url(${
                      makeFroth({
                        src: item.poster,
                        size: "s",
                      }).src
                    })`,
                  }}
                />
              </LazyLoad>
            </li>
          );
        })}
      </ListUL>
    </Bleed>
  );
};
