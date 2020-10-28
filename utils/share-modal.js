import React from "react";
import * as clipboard from "clipboard-polyfill";

import { setModal } from "../core/store/actions-modal";
import Share from "../core/components/icons/Share";
import ga from "./data/ga";

export const ShareButtonText = () => (
  <span
    style={{
      display: "inline-block",
      marginLeft: "-1.25em",
    }}
  >
    <Share style={{ height: "1em", marginTop: "-.45em" }} /> Share
  </span>
);

export const shareModal = ({
  url,
  title,
  subtitle, // optional
  authorName, // optional
  id,
}) => {
  return {
    info: {
      title,
      text: (
        <>
          <span style={{ userSelect: "none" }}>Link URL: </span>
          <strong>{url}</strong>
        </>
      ),
      buttons: [
        {
          to: url,
          onClick: event => {
            event.preventDefault();
            clipboard.writeText(url);
            ga("event", {
              category: "nav",
              action: "article.share.copy",
              label: url,
            });
          },
          text: "Copy Link",
        },
        {
          to:
            "https://twitter.com/intent/tweet?text=" +
            encodeURIComponent(
              `“${title + (subtitle ? ": " + subtitle : "")}${
                !authorName ? "." : ""
              }”${authorName ? ` – by ${authorName}.` : ""} Read on: ${url}`
            ),
          onClick: () =>
            ga("event", {
              category: "nav",
              action: "article.share.twitter",
              label: url,
            }),
          text: "Share on Twitter",
        },
        {
          to:
            "https://www.facebook.com/sharer/sharer.php?u=" +
            encodeURIComponent(url),
          text: "Share on Facebook",
          onClick: () =>
            ga("event", {
              category: "nav",
              action: "article.share.facebook",
              label: url,
            }),
        },
      ],
    },
    id: "share/" + id,
  };
};

const shareModalTrigger = ({
  url,
  title,
  subtitle, // optional
  authorName, // optional
  id,
  dispatch,
}) => {
  return {
    to: url,
    text: <ShareButtonText />,
    onClick: event => {
      event.preventDefault();
      event.stopPropagation();

      dispatch(setModal(shareModal({ url, title, subtitle, authorName, id })));
    },
  };
};
export default shareModalTrigger;
