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
      <p>
        Get bookmarking, apps, free PDF guides, Community Letters, and{" "}
        <Link to="/account">more</Link>:
      </p>
    ),
    signin: true,
    noStar: true,
  },
};
