export const NAME = "Analog.Cafe";
export const DESCRIPTION_SHORT = "A Film Photography Magazine";
export const DESCRIPTION_LONG =
  "Weekly photo essays on art, travel, and culture. Analogue cameras, film, history, and techniques. A growing effort of authors and members with exclusive access to downloads, secret articles, and a monthly member newsletter.";

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
              <span style={{ textTransform: "uppercase" }}>
                Please check your
              </span>{" "}
              {email} <span style={{ textTransform: "uppercase" }}>email</span>
            </strong>{" "}
            and click the link we just sent you.
          </span>
        ),
      },
      id: "notification/check-email",
    };
  },
};
