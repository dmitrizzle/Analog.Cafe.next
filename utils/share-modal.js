import { useSelector } from "react-redux";
import React from "react";
import * as clipboard from "clipboard-polyfill";

import { interpretTheme } from "../core/components/controls/Theme/utils";
import { setModal } from "../core/store/actions-modal";
import { themeOptions } from "../constants/styles/themes";
import { withRedux } from "./with-redux";
import Facebook from "../core/components/icons/Facebook";
import Pinterest from "../core/components/icons/Pinterest";
import Share from "../core/components/icons/Share";
import Twitter from "../core/components/icons/Twitter";
import ga from "./data/ga";

export const ShareButtonText = withRedux(({ marginLeft }) => {
  const theme = interpretTheme(useSelector(({ theme }) => theme));
  return (
    <span
      style={{
        display: "inline-block",
        marginLeft: marginLeft || "-1.25em",
      }}
    >
      <Share
        style={{ height: "1em", marginTop: "-.45em" }}
        stroke={themeOptions[theme].heading}
      />{" "}
      Share
    </span>
  );
});

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
          text: (
            <>
              <Twitter
                fill="#1da1f2"
                style={{
                  width: "1.5em",
                  margin: "-.25em -.2em 0 -.25em",
                }}
              />{" "}
              Share on Twitter
            </>
          ),
        },
        {
          to: `http://pinterest.com/pin/create/button/?url=${encodeURIComponent(
            url
          )}&description=${title + subtitle ? `: ${subtitle}` : ""}`,
          text: (
            <>
              <Pinterest
                style={{
                  width: "1em",
                  margin: "-.25em .15em 0 -.25em",
                }}
              />{" "}
              Save to Pinterest
            </>
          ),
          onClick: () =>
            ga("event", {
              category: "nav",
              action: "article.share.pinterest",
              label: url,
            }),
        },
        {
          to:
            "https://www.facebook.com/sharer/sharer.php?u=" +
            encodeURIComponent(url),
          text: (
            <>
              <Facebook
                fill="#4267b2"
                style={{
                  width: "1.5em",
                  margin: "-.25em -.2em 0 -.25em",
                }}
              />{" "}
              Share on Facebook
            </>
          ),
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
