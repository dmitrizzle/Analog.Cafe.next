import React from "react";

import { AuthorsPrinted } from "../../../../../pages/article";
import {
  DocketResponsive,
  DocketResponsiveImage,
  DocketResponsiveInfo,
} from "./DocketResponsive";
import {
  getHumanDatestamp,
  isXWeeksAgo,
  readType,
  readingTime,
} from "../../../../../utils/time";
import { getTitleFromSlug } from "../../../../../utils/url-slugs";
import { makeFroth } from "../../../../../utils/froth";
import Bleed from "./Bleed";
import GridButton from "../../../controls/Button/components/GridButton";
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

          const { isAdmin, readReceipts } = props;
          const itemProps = {
            private: props.private,
            isAdmin,
            item,
            readReceipts,
          };
          const dateProps =
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
                  read: props.readReceipts
                    ? props.readReceipts.filter(
                        receipt =>
                          receipt.articleId === item.id &&
                          (receipt.readOn > item.date.updated ||
                            receipt.readOn > item.date.published)
                      ).length > 0
                    : null,
                }
              : {};

          const listItemAuthorDateProps = { ...itemProps, ...dateProps };

          return (
            <li key={item._id || item.id}>
              {/*
              // onClick={() => {
              //   let label;
              //   if (dateProps.isNew && !dateProps.read) label = "new";
              //   else if (dateProps.isOldAndNewlyEdited && !dateProps.read)
              //     label = "updated";
              //   else label = undefined;
              //
              //   // NOTE:
              //   GA.event({
              //     category: "Navigation",
              //     action: "List.click",
              //     label
              //   })
              // }}
              // */}

              <DocketResponsive
                to={
                  item.slug &&
                  (props.private && !props.isUserFavourites
                    ? "/submissions"
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
                    <em>
                      {item.stats &&
                        capitalizeFirstLetter(
                          readType(item.stats.images, readingTime(item.stats))
                        )}{" "}
                      read by <AuthorsPrinted authors={item.authors} />. It was
                      published on{" "}
                      {item.date && getHumanDatestamp(item.date.published)} and
                      will take about {item.stats && readingTime(item.stats)}{" "}
                      minute(s) to finish.
                    </em>
                  </small>
                </DocketResponsiveInfo>
                {item.stats && item.type !== "placeholder" && (
                  <GridButton branded>
                    {item.tag
                      ? getTitleFromSlug(item.tag, {
                          smartTagFromImageCount: item.stats.images,
                        }).toLowerCase()
                      : "submission"}
                  </GridButton>
                )}
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
