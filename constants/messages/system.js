import { css } from "styled-components";
import React from "react";

export const NAME = "Analog.Cafe";
export const DESCRIPTION_SHORT = "A Film Photography Blog";
export const DESCRIPTION_LONG =
  "Weekly photo essays on art, travel, and culture. Analogue cameras, film, history, and techniques. Analog.Cafe is a group effort from contributing writers, artists, and photographers to educate and entertain our growing creatively-inclined audience.";

export const CONTACT_EMAIL = "d@analog.cafe";

// this const is requested from outside of composer,
// however, constants/composer.js is much larger than this file and
// isn't necessary for the above cases
export const INPUT_HEADER_DEFAULTS = { title: "", subtitle: "" };

export const CARD_ALERTS = {
  LOGIN_EMAIL: () => {
    return {
      info: {
        image: "image-froth_1600000_Hki8Y1vlB",
        title: "Check Your Email",
        text: (
          <>
            <strong>
              Please{" "}
              <span
                css={css`
                  text-transform: uppercase;
                  font-style: normal;
                  color: ${({ theme }) => theme.brand};
                `}
              >
                check your inbox
              </span>{" "}
              and click the link
            </strong>{" "}
            in the email you just received from Analog.Cafe to sign in.
          </>
        ),
      },
      id: "notification/check-email",
    };
  },
};
