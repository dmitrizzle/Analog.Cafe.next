import React from "react";
import * as clipboard from "clipboard-polyfill";

import { setModal } from "../core/store/actions-modal";
import Share from "../core/components/icons/Share";

export default ({
  url,
  title,
  subtitle, // optional
  authorName, // optional
  id,
  dispatch,
}) => {
  return {
    to: url,
    text: (
      <span
        style={{
          display: "inline-block",
          marginLeft: "-1.25em",
        }}
      >
        <Share style={{ height: "1em", marginTop: "-.45em" }} /> Share
      </span>
    ),
    onClick: event => {
      event.preventDefault();
      event.stopPropagation();

      dispatch(
        setModal({
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
                },
                text: "Copy Link",
              },
              {
                to:
                  "https://twitter.com/intent/tweet?text=" +
                  encodeURIComponent(
                    `“${title +
                      (subtitle ? ": " + subtitle : "")}${!authorName &&
                      "."}”${authorName &&
                      ` – by ${authorName}.`} Read on: ${url}`
                  ),
                text: "Share on Twitter",
              },
              {
                to:
                  "https://www.facebook.com/sharer/sharer.php?u=" +
                  encodeURIComponent(url),
                text: "Share on Facebook",
              },
            ],
          },
          id: "share/" + id,
        })
      );
    },
  };
};
