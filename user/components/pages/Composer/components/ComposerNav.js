import { connect } from "react-redux";
import React from "react";
import styled, { css } from "styled-components";

import { HINTS } from "../../../../../constants/composer";
import { HideOnPhablet } from "../../../../../core/components/vignettes/HideOnScreenSize";
import { NavModal } from "../../../../../core/components/controls/Nav/components/NavMenu";
import { c_black, c_grey_dark } from "../../../../../constants/styles/colors";
import { isIncompleteDraft } from "../../../../../utils/composer";
import SubNav, {
  SubNavItem,
} from "../../../../../core/components/controls/Nav/SubNav";

const NavModalSave = styled(NavModal)`
  color: ${props =>
    props.status === "ok"
      ? c_black
      : css`
          ${c_grey_dark} !important
        `};
  transition: "color 250ms";
`;

const ComposerNav = props => (
  <SubNav wedge>
    <SubNavItem>
      <NavModalSave unmarked with={HINTS.SAVE} {...props}>
        Saved
      </NavModalSave>
    </SubNavItem>
    <SubNavItem>
      <NavModal unmarked with={HINTS.HELP}>
        Help
      </NavModal>
    </SubNavItem>
    <SubNavItem>
      <NavModal
        unmarked
        with={
          isIncompleteDraft()
            ? HINTS.INCOMPLETE_DRAFT
            : HINTS.SUBMISSION_AGREEMENT
        }
      >
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
