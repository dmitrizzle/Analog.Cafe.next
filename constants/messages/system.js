import { c_red } from "../styles/colors";
export const NAME = "Analog.Cafe";
export const DESCRIPTION_SHORT = "A Film Photography Magazine";
export const DESCRIPTION_LONG =
  "Weekly photo essays on art, travel, and culture. Analogue cameras, film, history, and techniques. Analog.Cafe is a group effort from contributing writers, artists, and photographers to educate and entertain our growing creatively-inclined audience.";

export const CONTACT_EMAIL = "d@analog.cafe";

// this const is requested from outside of composer,
// however, constants/composer.js is much larger than this file and
// isn't necessary for the above cases
export const INPUT_HEADER_DEFAULTS = { title: "", subtitle: "" };

export const CARD_ALERTS = {
  LOGIN_EMAIL: email => {
    return {
      info: {
        image: "image-froth_1600000_Hki8Y1vlB",
        title: "Check Your Email",
        text: (
          <span>
            <strong>
              Please{" "}
              <span
                style={{
                  textTransform: "uppercase",
                  fontStyle: "normal",
                  color: c_red,
                }}
              >
                check your{" "}
                <span style={{ textTransform: "none" }}>{email}</span> email
              </span>
            </strong>{" "}
            and click the link we just sent you.
          </span>
        ),
      },
      id: "notification/check-email",
    };
  },
};
