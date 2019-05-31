import React from "react";

import { emailString } from "../../core/components/vignettes/Email";
import Link from "../../core/components/controls/Link";

export const TEXT_EDITORIAL_RELEASE = `All accepted submissions are edited for grammar and style. We aim to preserve the voice and the message of your work as much as possible, but can’t guarantee the published version will match your expectations. If you’d like to approve the edits or request changes, please email ${emailString}.`;
export const CARD_DIALOGUES = {
  CONSENT: {
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
          to: "/submit/compose",
          text: "Cancel",
        },
      ],
    },
    id: "hints/submit-consent",
  },
};
export const CARD_ALERTS = {
  AUTO_SAVE: {
    info: {
      title: "Never Loose Your Work!",
      text:
        "Your text and images are saved automatically onto your device as you type. Even if you’re offline! You can safely close your browser and turn off the device or computer. Just remember to use the same browser.",
    },
    id: "hints/auto-save",
  },
};
