import React from "react";

import Link from "../../../core/components/controls/Link";
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
      Get Film Price Updates
    </LinkButton>
    <p
      style={{
        textAlign: "center",
        marginTop: "-.5em",
        marginBottom: "3em",
        lineHeight: "1.15em",
      }}
    >
      <small>
        Get an email with lots of useful info whenever these prices change.
      </small>
    </p>
  </>
);

export default SubscribeToPriceGuideUpdates;
