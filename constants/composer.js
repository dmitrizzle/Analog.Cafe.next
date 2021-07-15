import React from "react";

import { CLOUDINARY_BASE } from "./cloudinary";
import { CONTACT_EMAIL } from "./messages/system";
import Link from "../core/components/controls/Link";

export const INPUT_TITLE_LIMIT = 52;
export const INPUT_SUBTITLE_LIMIT = 75;
export const INPUT_SUMMARY_LIMIT = 250;
export const CONTENT_MIN_LENGTH = 10;
export const CONTENT_MIN_LENGTH_RECOMMENDED = 250;

export const MIME_PICTURES = ["image/png", "image/jpeg"];
export const MIME_PICTURES_HUMAN = "PNG or JPEG";

export const TEXT_EDITORIAL_RELEASE = `All accepted submissions are edited for grammar and style. We aim to preserve the voice and the message of your work as much as possible, but can’t guarantee the published version will match your expectations. If you’d like to approve the edits or request changes, please email ${CONTACT_EMAIL}.`;

const Bullet = () => <span style={{ fontStyle: "normal" }}>✹</span>;

export const HINTS = {
  SAVE: {
    info: {
      title: "Saved Locally",
      text: () => (
        <span>
          Your text, images, and formatting are saved on your computer within
          your browser app. It’s safe to close this{" "}
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
            <Link to="/write/draft">analog.cafe/write/draft</Link>
          </strong>
          <br />
          using the same{" "}
          {process.browser &&
          document.documentElement &&
          "ontouchstart" in document.documentElement
            ? "browser app"
            : "browser"}
          .<br />
          <br />
          <strong>WARNING:</strong> if you clear your browser storage or
          cookies, this draft may also get deleted. Public computers tend to do
          this automatically.
          <br />
          <br />
          <span style={{ fontStyle: "normal" }}>✪</span> <strong>Note:</strong>{" "}
          nobody but you can access your locally saved content.
        </span>
      ),
    },
    id: "help/save",
  },
  HELP: {
    info: {
      title: "Composer Help",
      image:
        CLOUDINARY_BASE +
        "v1528904759/image-froth_1010453_425a5704760c4879b31e008315c3047c",
      text: () => (
        <>
          <strong>Analog.Cafe Composer</strong> makes submissions easy. No more
          endless email and document uploads!
          <br />
          <br />
          What you see in the editor is exactly what your article will look like
          when published.
          <br />
          <br />
          Add <u>links</u> and <strong>font</strong>{" "}
          <span style={{ fontStyle: "normal" }}>styles</span>. Format your
          titles, quotes, and images.
          <br />
          <br />
          See who and when edited your article. Get notified once your work is
          published or rejected.
        </>
      ),
      buttons: [
        {
          to: "/r/open-call-g99w",
          text: "How to Get Featured",
        },
        {
          to: "/tos",
          text: "Terms and Conditions",
        },
        // {
        //   to: "/write/restore-draft",
        //   text: "Draft Restore Tool",
        // },
      ],
    },
    id: "help/composer",
  },
  SUBMISSION_AGREEMENT: {
    info: {
      title: "Editorial Release",
      text: () => (
        <span>
          {TEXT_EDITORIAL_RELEASE} Full list of rules applied to all submissions
          is listed{" "}
          <strong>
            <Link to="/tos">here</Link>
          </strong>
          .
        </span>
      ),
      buttons: [
        {
          to: "/write/upload",
          text: "Agree",
          branded: true,
        },
        {
          to: "/write/draft",
          text: "Cancel",
          onClick: event => {
            event.preventDefault();
          },
        },
      ],
    },
    id: "help/consent",
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
            <Bullet /> A good title.
          </strong>
          <br />
          <strong>
            <Bullet /> At least {CONTENT_MIN_LENGTH_RECOMMENDED} words.
          </strong>
          <br />
          <strong>
            <Bullet /> One or more image(s).
          </strong>
        </span>
      ),
    },
    id: "error/write-incomplete",
  },
};
