import React from "react";

import { emailString } from "../core/components/vignettes/Email";
import Link from "../core/components/controls/Link";
import document from "../pages/_document";

export const INPUT_TITLE_LIMIT = 52;
export const INPUT_SUBTITLE_LIMIT = 75;
export const INPUT_SUMMARY_LIMIT = 250;
export const CONTENT_MIN_LENGTH = 10;

export const MIME_PICTURES = ["image/png", "image/jpeg"];
export const MIME_PICTURES_HUMAN = "PNG or JPEG";

export const INPUT_HEADER_DEFAULTS = { title: "", subtitle: "" };

export const TEXT_EDITORIAL_RELEASE = `All accepted submissions are edited for grammar and style. We aim to preserve the voice and the message of your work as much as possible, but can’t guarantee the published version will match your expectations. If you’d like to approve the edits or request changes, please email ${emailString}.`;

const Bullet = () => <span style={{ fontStyle: "normal" }}>✹</span>;

export const HINTS = {
  SAVE: {
    info: {
      title: "Saved.",
      text: () => (
        <span>
          Your text, images, and formatting are saved. It’s safe to close this{" "}
          {process.browser &&
          document.documentElement &&
          "ontouchstart" in document.documentElement
            ? "app"
            : "window"}{" "}
          & turn off your{" "}
          {process.browser &&
          document.documentElement &&
          "ontouchstart" in document.documentElement
            ? "device"
            : "computer"}
          .
          <br />
          <br />
          To open this saved draft, go to
          <br />
          <strong>
            <Link to="/submit/draft">analog.cafe/submit/draft</Link>
          </strong>
          <br />
          using the same{" "}
          {process.browser &&
          document.documentElement &&
          "ontouchstart" in document.documentElement
            ? "app"
            : "browser"}
          .<br />
          <br />
          WARNING: if you clear your browser storage or cookies, this draft may
          also get deleted. It’s recommended that back up your work.
        </span>
      ),
    },
    id: "hints/save",
  },
  HELP: {
    info: {
      title: "Composer Help",
      image:
        "https://res.cloudinary.com/analog-cafe/image/upload/v1528904759/image-froth_1010453_425a5704760c4879b31e008315c3047c",
      text: () => (
        <span>
          <strong>Analog.Cafe Composer</strong> makes submissions easy. No more
          endless email and document uploads!
          <br />
          <br />
          Easily add <u>links</u> and <strong>font</strong>{" "}
          <span style={{ fontStyle: "normal" }}>styles</span>. Format your
          titles, quotes, and images.
          <br />
          <br />
          You will know exactly what your article will look like published. See
          who (from Analog.Cafe editorial team) and when edited your article.
          Get notified once the article is published or rejected.
        </span>
      ),
      buttons: [
        {
          to: "/submit",
          text: "Submissions Overview",
        },
        {
          to: "/r/open-call-g99w",
          text: "How to Get Featured",
        },
        {
          to: "/submit/rules",
          text: "Submission Rules",
        },
        {
          to: "/submit/restore-draft",
          text: "Draft Restore Tool",
        },
      ],
    },
    id: "hints/help/composer",
  },
  SUBMISSION_AGREEMENT: {
    info: {
      title: "Editorial Release",
      text: () => (
        <span>
          {TEXT_EDITORIAL_RELEASE} Full list of rules applied to all submissions
          is listed{" "}
          <strong>
            <Link to="/submit/rules">here</Link>
          </strong>
          .
        </span>
      ),
      buttons: [
        {
          to: "/submit/upload",
          text: "Agree",
          branded: true,
        },
        {
          to: "/submit/draft",
          text: "Cancel",
        },
      ],
    },
    id: "hints/submit/consent",
  },
  INCOMPLETE_DRAFT: {
    info: {
      title: "Incomplete Draft ⚠️",
      text: () => (
        <span>
          <strong>Your submission did NOT go through.</strong> Please make sure
          that you’ve added:
          <br />
          <br />
          <strong>
            <Bullet /> A title.
          </strong>
          <br />
          <strong>
            <Bullet /> {CONTENT_MIN_LENGTH}+ words of text.
          </strong>
          <br />
          <strong>
            <Bullet /> One or more image(s).
          </strong>
        </span>
      ),
    },
    id: "errors/submit/content",
  },
};
