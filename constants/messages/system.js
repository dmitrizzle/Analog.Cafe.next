import { css } from "styled-components";
import React from "react";

import { SIGN_IN_MODAL } from "../../core/components/layouts/Main/constants";
import { UnorderedList } from "../../core/components/pages/Article/components/ArticleSection";
import Link from "../../core/components/controls/Link";

export const NAME = "Analog.Cafe";
export const DESCRIPTION_SHORT = "A Film Photography Blog";
export const DESCRIPTION_MED = `Weekly photo essays on art, travel, and culture. Analogue cameras, film, history, and techniques.`;
export const DESCRIPTION_LONG = `${DESCRIPTION_MED} Analog.Cafe is a group effort from contributing writers, artists, and photographers to educate and entertain our growing creatively-inclined audience.`;

export const CONTACT_EMAIL = "d@analog.cafe";

// this const is requested from outside of composer,
// however, constants/composer.js is much larger than this file and
// isn't necessary for the above cases
export const INPUT_HEADER_DEFAULTS = { title: "", subtitle: "" };

export const CARD_ALERTS = {
  LOGIN_EMAIL: () => {
    return {
      info: {
        title: "Check Your Email",
        text: (
          <>
            <strong>
              <span
                css={css`
                  text-transform: uppercase;
                  font-style: normal;
                  color: ${({ theme }) => theme.brand};
                `}
              >
                check your inbox
              </span>{" "}
              and click the link in the email from Analog.Cafe
            </strong>{" "}
            to sign in.
          </>
        ),
      },
      id: "notification/check-email",
    };
  },
  SIGN_IN_MODAL: () => SIGN_IN_MODAL,
  ACCOUNT_FEATURES: () => {
    return {
      info: {
        title: "Account Features",
        text: (
          <div>
            <UnorderedList style={{ paddingLeft: "1em" }}>
              <li>
                Manage your <strong>subscriptions</strong> to Analog.Cafe’s
                email newsletters and notifications.
              </li>
              <li>
                Save your favourite reads for later with{" "}
                <strong>Bookmarks</strong>.
              </li>
              <li>
                Access to <Link to="/write">Submissions</Link> to get your work
                featured.
              </li>
              <li>Get access to exclusive offers and discounts.</li>
            </UnorderedList>
          </div>
        ),
        buttons: [
          {
            to: "/r/your-account-racl",
            text: "Learn More",
          },
          { text: "Sign In", branded: true, to: "/account" },
        ],
      },
      id: "help/all-account-features",
    };
  },
};
