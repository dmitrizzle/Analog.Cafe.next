import React from "react";

import { c_red } from "../../../../constants/styles/themes";
import Link from "../../controls/Link";

const DEFAULT = {
  showBrandName: false,
  tallMargin: false,
  isMinimal: false,
};
const MINIMAL = {
  ...DEFAULT,
  isMinimal: true,
};
const HIDDEN = {
  ...MINIMAL,
  isHidden: true,
};

export const NAV_CONFIG = {
  DEFAULT,
  MINIMAL,
  HIDDEN,
  LIST: {
    isMinimal: false,
    showBrandName: true,
    tallMargin: true,
  },
  NONE: {
    isMinimal: true,
    skipAllNavigation: true,
  },
};

export const SIGN_IN_MODAL = {
  status: "ok",
  info: {
    title: (
      <>
        <span style={{ color: c_red }}>◉</span> Sign In
      </>
    ),
    text: (
      <>
        <p style={{ marginBottom: "1.5em" }}>
          Sign in to get more content like this, and FREE{" "}
          <strong>
            <Link to="/r/your-account-racl">member perks</Link>
          </strong>
          .
        </p>
        <p>
          Questions? Feedback? <Link to="/about#contact">Contact Dmitri</Link>.
          <span style={{ fontStyle: "normal" }}> 👋</span>
        </p>
      </>
    ),
    signin: true,
    noStar: true,
  },
};
