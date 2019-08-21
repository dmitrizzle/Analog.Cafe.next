import React from "react";

import { AuthorsPrinted } from "../../Article/components/AuthorsPrinted";
import {
  DocketResponsive,
  DocketResponsiveImage,
  DocketResponsiveInfo,
} from "./DocketResponsive";
import { LabelWrap } from "../../../controls/Docket";
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
      <ListUL status={props.status} author={props.author}>
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
                //
                //   // NOTE:
                //   GA.event({
                //     category: "Navigation",
                //     action: "List.click",
                //     label
                //   })
              }}
            >
              <DocketResponsive
                to={
                  item.slug &&
                  (props.private && !props.isUserFavourites
                    ? "/account/submission"
                    : "/r") +
                    "/" +
                    item.slug
                }
              >
                <DocketResponsiveImage src={item.poster} center />

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
                    {item.type !== "placeholder" && (
                      <em>
                        {item.stats &&
                          capitalizeFirstLetter(
                            readType(item.stats.images, readingTimeMinutes)
                          )}{" "}
                        read by{" "}
                        <AuthorsPrinted authors={item.authors} limit={3} />. It
                        was published on{" "}
                        {item.date && getHumanDatestamp(item.date.published)}{" "}
                        and will take about {item.stats && readingTimeMinutes}{" "}
                        minute
                        {readingTimeMinutes > 1 && "s"} to finish.
                      </em>
                    )}
                  </small>
                </DocketResponsiveInfo>
                <LabelWrap>
                  {item.stats && item.type !== "placeholder" && (
                    <Label inverse>
                      {item.tag
                        ? getTitleFromSlug(item.tag, {
                            smartTagFromImageCount: item.stats.images,
                          }).toLowerCase()
                        : "submission"}
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
                    <Label blue>{item.status}</Label>
                  )}
                </LabelWrap>
              </DocketResponsive>
              <ZigZagPicture
                className="film-leader"
                index={index}
                style={{
                  backgroundImage: `url(${
                    makeFroth({
                      src: item.poster,
                      size: "m",
                    }).src
                  })`,
                }}
              />
            </li>
          );
        })}
      </ListUL>
    </Bleed>
  );
};
