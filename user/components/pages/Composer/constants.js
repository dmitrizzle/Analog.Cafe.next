import React from "react";

import { emailString } from "../../../../core/components/vignettes/Email";
import Link from "../../../../core/components/controls/Link";

export const TEXT_EDITORIAL_RELEASE = `All accepted submissions are edited for grammar and style. We aim to preserve the voice and the message of your work as much as possible, but can’t guarantee the published version will match your expectations. If you’d like to approve the edits or request changes, please email ${emailString}.`;
export const HINTS = {
  SAVE: {
    info: {
      title: "Saved.",
      text: (
        <span>
          Your text, images, and formatting are saved. It’s safe to close this{" "}
          {process.browser && "ontouchstart" in document.documentElement
            ? "app"
            : "window"}{" "}
          & turn off your{" "}
          {process.browser && "ontouchstart" in document.documentElement
            ? "device"
            : "computer"}
          .
          <br />
          <br />
          To resume, go to
          <br />
          <strong>
            <Link to="/submit/draft">analog.cafe/submit/draft</Link>
          </strong>
          <br />
          using the same{" "}
          {process.browser && "ontouchstart" in document.documentElement
            ? "app"
            : "browser"}
          .
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
      text: (
        <span>
          Analog.Cafe <strong>Composer</strong> tool makes submissions and
          collaboration easy. No more endless email and document uploads!
          <br />
          <br />
          Easily add <u>links</u> and <strong>font</strong>{" "}
          <span style={{ fontStyle: "normal" }}>styles</span>. Format your
          titles, quotes, and images. Know exactly what your article will look
          like published.
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
  SUBMIT: {
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
          to: "/submit/confirm-full-consent",
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
};
