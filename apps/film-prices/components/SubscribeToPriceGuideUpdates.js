import React from "react";

import LinkButton from "../../../core/components/controls/Button/components/LinkButton";
import ga from "../../../utils/data/ga";

const referral = "/account/subscriptions?add=price_updates_35#price_updates_35";

const SubscribeToPriceGuideUpdates = () => (
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
      style={{ marginTop: "3em" }}
    >
      Subscribe
    </LinkButton>
    <p
      style={{
        textAlign: "center",
        marginTop: "-.5em",
        marginBottom: "3em",
        lineHeight: "1.15em",
      }}
    >
      <small>Get an update when film prices change significantly.</small>
    </p>
  </>
);

export default SubscribeToPriceGuideUpdates;
