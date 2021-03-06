import { useSelector } from "react-redux";
import React from "react";
import styled, { css } from "styled-components";

import { HINTS } from "../../../../../constants/composer";
import { HideOnPhablet } from "../../../../../core/components/vignettes/HideOnScreenSize";
import { NavModal } from "../../../../../core/components/controls/Nav/components/NavMenu";
import { withRedux } from "../../../../../utils/with-redux";
import SubNav, {
  SubNavItem,
} from "../../../../../core/components/controls/Nav/SubNav";
import isIncompleteDraft from "../../../../../utils/editor/is-incomplete-draft";

const NavModalSave = styled(NavModal)`
  color: ${({ editStatus, theme }) =>
    editStatus === "ok"
      ? theme.fg
      : css`
          ${theme.grey_dark} !important
        `};
  transition: "color 250ms";
`;

const ComposerNav = () => {
  const composer = useSelector(state => state.composer);
  return (
    <SubNav data-cy="ComposerNav">
      <SubNavItem>
        <NavModalSave
          data-cy="NavModalSave"
          unmarked
          with={HINTS.SAVE}
          editStatus={composer.editStatus}
        >
          Saved
        </NavModalSave>
      </SubNavItem>
      <SubNavItem>
        <NavModal data-cy="NavModalHelp" unmarked with={HINTS.HELP}>
          Help
        </NavModal>
      </SubNavItem>
      <SubNavItem>
        <NavModal
          data-cy="NavModalSubmit"
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
};

export default withRedux(ComposerNav);
