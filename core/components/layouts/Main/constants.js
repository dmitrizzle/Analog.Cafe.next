import React from "react";

import { c_red } from "../../../../constants/styles/themes";
import ModalCaptionSelfClosingLink from "../../controls/Modal/components/ModalCaptionSelfClosingLink";

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
          Get more <span style={{ fontStyle: "normal" }}>🎞</span> photography
          content and lots of awesome FREE{" "}
          <strong>
            <ModalCaptionSelfClosingLink to="/r/your-account-racl">
              member perks
            </ModalCaptionSelfClosingLink>
          </strong>
          !
        </p>
        <p>
          5 seconds to sign up,{" "}
          <ModalCaptionSelfClosingLink to="/privacy-policy" target="_blank">
            no spam
          </ModalCaptionSelfClosingLink>
          .
        </p>
      </>
    ),
    signin: true,
    noStar: true,
  },
};
