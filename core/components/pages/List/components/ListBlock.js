import React from "react";

import { isXWeeksAgo } from "../../../../../utils/time";
import { makeFroth } from "../../../../../utils/froth";
import Bleed from "./Bleed";
import Link from "../../../controls/Link";
import ListItemAuthorDate from "./ListItemAuthorDate";
import ListItemStats from "./ListItemStats";
import ListUL from "./ListUL";
import ZigZagPicture from "./ZigZagPicture";

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
            item && item.date && item.type !== "placeholder"
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
              <Link
                to={
                  item.slug &&
                  (props.private && !props.isUserFavourites
                    ? "/submissions"
                    : "/r") +
                    "/" +
                    item.slug
                }
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
              >
                <section>
                  <figure
                    style={
                      item.status === "rejected" ? { opacity: "0.25" } : null
                    }
                  >
                    {item.type !== "placeholder" && (
                      <div
                        style={{
                          backgroundImage: item.poster
                            ? `url(${
                                makeFroth({
                                  src: item.poster,
                                  size: index ? "s" : "m",
                                }).src
                              })`
                            : undefined,
                          zIndex: 1,
                        }}
                        aria-label={item.title + " poster image"}
                      />
                    )}
                  </figure>
                  <div>
                    <h2
                      style={{
                        opacity:
                          item.status === "rejected" ? "0.25" : undefined,
                        letterSpacing:
                          item.type !== "placeholder" ? undefined : "-0.13em",
                      }}
                    >
                      {item.title}
                    </h2>
                    <h3
                      style={{
                        letterSpacing:
                          item.type !== "placeholder" ? undefined : "-0.165em",
                        paddingLeft:
                          item.type !== "placeholder" ? undefined : ".05em",
                      }}
                    >
                      {item.subtitle || ""}
                    </h3>
                    <div>
                      <ListItemStats item={item} private={props.private} />
                      <ListItemAuthorDate {...listItemAuthorDateProps} />
                    </div>
                  </div>
                </section>
                <ZigZagPicture
                  index={index}
                  style={{
                    backgroundImage: item.poster
                      ? `url(${
                          makeFroth({
                            src: item.poster,
                            size: index ? "s" : "m",
                          }).src
                        })`
                      : undefined,
                  }}
                />
              </Link>
            </li>
          );
        })}
      </ListUL>
    </Bleed>
  );
};
