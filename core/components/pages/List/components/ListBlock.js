import React, { useState, useEffect } from "react";
import Router from "next/router";

import { AuthorsPrinted } from "../../Article/components/AuthorsPrinted";
import {
  ClampedByline,
  ClampedSubtitle,
  ClampedSummary,
} from "./ClampedListItems";
import {
  DocketResponsive,
  DocketResponsiveImage,
  DocketResponsiveInfo,
} from "./DocketResponsive";
import { LabelWrap } from "../../../controls/Docket";
import { ROUTE_TAGS, ROUTE_LABELS } from "../constants";
import { endWithAPeriod } from "../../../../../utils/author-credits";
import { getTitleFromSlug } from "../../../../../utils/url";
import { isXWeeksAgo } from "../../../../../utils/time";
import { scrubSummary } from "../../../../../utils/meta";
import Bleed from "./Bleed";
import Label from "../../../vignettes/Label";
import Link from "../../../controls/Link";
import ListUL from "./ListUL";
import ga from "../../../../../utils/data/ga";

const ListBlock = props => {
  const [isListLoading, setIsListLoading] = useState(false);
  let isMounted = true;

  Router.events.on("routeChangeStart", path => {
    // opacity .5
    if (path.includes("/r/")) return;
    isMounted && setIsListLoading(true);
  });
  Router.events.on("routeChangeComplete", path => {
    // opacity 1
    if (path.includes("/r/")) return;
    setIsListLoading(false); // default state should be 'loaded' as this component can get mounted/unmounted unexpectedly
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
                <DocketResponsiveImage
                  tag={item.tag}
                  src={item.poster}
                  alt={title}
                />
                <DocketResponsiveInfo>
                  <h4>{title}</h4>
                  <small>
                    {subtitle && (
                      <ClampedSubtitle title={subtitle}>
                        {subtitle}
                      </ClampedSubtitle>
                    )}
                    <ClampedSummary title={item.summary}>
                      {scrubSummary(item.summary)}
                    </ClampedSummary>

                    <ClampedByline>
                      — <AuthorsPrinted authors={item.authors} limit={3} />
                      {endWithAPeriod(item.authors)}
                    </ClampedByline>
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
                          ]?.title
                            ?.replace("All ", "")
                            .replace(" Articles", "")
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
            </li>
          );
        })}
      </ListUL>
    </Bleed>
  );
};

export default ListBlock;
