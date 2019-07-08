import { connect } from "react-redux";
import React from "react";

import { HINTS } from "../../../../../constants/composer";
import { HideOnPhablet } from "../../../../../core/components/vignettes/HideOnScreenSize";
import { NavModal } from "../../../../../core/components/controls/Nav/components/NavMenu";
import { c_black, c_grey_dark } from "../../../../../constants/styles/colors";
import SubNav, {
  SubNavItem,
} from "../../../../../core/components/controls/Nav/SubNav";

const ComposerNav = props => (
  <SubNav wedge>
    <SubNavItem>
      <NavModal
        unmarked
        with={HINTS.SAVE}
        style={{
          color: props.status === "ok" ? c_black : c_grey_dark,
          transition: "color 250ms",
        }}
      >
        Saved
      </NavModal>
    </SubNavItem>
    <SubNavItem>
      <NavModal unmarked with={HINTS.HELP}>
        Help
      </NavModal>
    </SubNavItem>
    <SubNavItem>
      <NavModal unmarked with={HINTS.SUBMIT}>
        <u>
          Submit<HideOnPhablet> for Review</HideOnPhablet>
        </u>
      </NavModal>
    </SubNavItem>
  </SubNav>
);

export default connect(
  ({ composer }) => composer,
  null
)(ComposerNav);
