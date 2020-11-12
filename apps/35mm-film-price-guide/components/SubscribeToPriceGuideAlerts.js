import React from "react";

import Link from "../../../core/components/controls/Link";
import LinkButton from "../../../core/components/controls/Button/components/LinkButton";
import ga from "../../../utils/data/ga";

const referral = "/account/subscriptions?add=price_updates_35";

const SubscribeToPriceGuideAlerts = () => (
  <>
    <LinkButton
      to={referral}
      onClick={() => {
        ga("event", {
          category: "nav",
          action: "app.35mmguide",
          label: referral,
        });
      }}
      branded
    >
      Get Price Alerts
    </LinkButton>
    <p
      style={{
        textAlign: "center",
        marginTop: "0em",
        lineHeight: "1.15em",
      }}
    >
      <small>
        <Link
          to={referral}
          onClick={() => {
            ga("event", {
              category: "nav",
              action: "app.35mmguide",
              label: referral,
            });
          }}
          branded
        >
          Subscribe
        </Link>{" "}
        to{" "}
        <strong>
          <em>“35mm Film — Price Alerts”</em>
        </strong>{" "}
        emails to get notified whenever the film prices change.
      </small>
    </p>
  </>
);

export default SubscribeToPriceGuideAlerts;
