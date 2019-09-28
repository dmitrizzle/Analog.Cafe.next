export const NAME = "Analog.Cafe";
export const DESCRIPTION_SHORT = "A Film Photography Magazine";

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
