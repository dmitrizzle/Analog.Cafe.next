import LazyLoad from "react-lazyload";
import React from "react";
import Router from "next/router";

import { AuthorsPrinted } from "../../Article/components/AuthorsPrinted";
import {
  DocketResponsive,
  DocketResponsiveImage,
  DocketResponsiveInfo,
} from "./DocketResponsive";
import { LabelWrap } from "../../../controls/Docket";
import { eventGA } from "../../../../../utils/data/ga";
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
import ListUL from "./ListUL";
import ZigZagPicture from "./ZigZagPicture";

const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export default props => {
  return (
    <Bleed author={props.author} noNegativeMargin={props.noNegativeMargin}>
      <ListUL status={props.status} author={props.author} data-cy="ListBlock">
        {props.items.map((item, index) => {
          // NOTE: index is used to show high quality image for first item only

          const { readReceipts } = props;

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
                  read: readReceipts
                    ? readReceipts.filter(
                        receipt =>
                          receipt.articleId === item.id &&
                          (receipt.readOn > item.date.updated ||
                            receipt.readOn > item.date.published)
                      ).length > 0
                    : null,
                }
              : {};

          const readingTimeMinutes = readingTime(item.stats);

          const link =
            item.slug &&
            (props.private && !props.isUserFavourites
              ? "/account/submission"
              : "/r") +
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

                eventGA({
                  category: "Navigation",
                  action: "List.click",
                  label,
                });
              }}
            >
              <DocketResponsive to={link}>
                <LazyLoad
                  throttle
                  once
                  offset={300}
                  height={"100%"}
                  key={item.id + index}
                >
                  <DocketResponsiveImage src={item.poster} center />
                </LazyLoad>

                <DocketResponsiveInfo>
                  <h4>{item.title}</h4>
                  <small>
                    {item.subtitle && (
                      <em>
                        {item.subtitle}
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
                <LabelWrap>
                  {item.stats && item.type !== "placeholder" && (
                    <Label
                      inverse={item.tag !== "link"}
                      blue={item.tag === "link"}
                    >
                      {item.tag
                        ? item.tag === "link"
                          ? "Link / Download"
                          : getTitleFromSlug(item.tag)
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
              </DocketResponsive>

              <LazyLoad
                throttle
                once
                offset={300}
                height={"100%"}
                key={item.id + index}
              >
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
