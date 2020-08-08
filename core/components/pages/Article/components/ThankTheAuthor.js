import React from "react";

import Link from "../../../controls/Link";

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
      <Link to="https://www.buymeacoffee.com">Buy Me A Coffee</Link>
    )}{" "}
    page where you can send a quick buck with PayPal, ApplePay, or a credit
    card.
  </>
);
