import React from "react";

import { CARD_COMMUNITY_REFERRAL } from "../../../../../constants/messages/affiliate";
import Link from "../../../controls/Link";
import Modal from "../../../controls/Modal";

export default ({ authorName, isKoFi, isBuyMeACoffee }) => (
  <>
    <strong>
      If you like the read, you can thank its author with a “coffee.”
    </strong>
    <br />
    <br />
    The red button, below, will take you to {authorName}’s{" "}
    {isKoFi && <Link to="https://ko-fi.com">Ko-fi</Link>}
    {isBuyMeACoffee && (
      <>
        <Link to="https://buymeacoff.ee/?via=dmitrizzle">Buy Me A Coffee</Link>
        {"|"}
        <em>
          <Modal with={CARD_COMMUNITY_REFERRAL("Buy Me a Coffee")}>cr</Modal>
        </em>
      </>
    )}{" "}
    page where you can send a quick buck with PayPal, ApplePay, or a credit
    card.
  </>
);
