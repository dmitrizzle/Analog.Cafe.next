import React, { useEffect, useState } from "react";

import { HINTS } from "../../user/components/pages/Composer/constants";
import { HideOnPhablet } from "../../core/components/controls/Nav";
import { NavModal } from "../../core/components/controls/Nav/components/NavMenu";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import Composer from "../../user/components/pages/Composer";
import EditorSection from "../../user/components/pages/Composer/components/EditorSection";
import NavItem from "../../core/components/controls/Nav/components/NavItem";
import NavWrapper from "../../core/components/controls/Nav/components/NavWrapper";
import TitleCreator from "../../user/components/pages/Composer/components/TitleCreator";

// href="/r/open-call-g99w"
export default () => {
  const [isClientEnv, updateEnv] = useState(false);
  useEffect(() => {
    updateEnv(true);
  });
  return (
    <ArticleWrapper className="fs-block">
      <NavWrapper
        style={{ display: "flex", justifyContent: "center", margin: 0 }}
      >
        <NavItem prime style={{ width: "auto", margin: "0 .175em" }}>
          <NavModal unmarked with={HINTS.SAVE}>
            Saved
          </NavModal>
        </NavItem>
        <NavItem prime style={{ width: "auto", margin: "0 .175em" }}>
          <NavModal unmarked with={HINTS.HELP}>
            Help
          </NavModal>
        </NavItem>
        <NavItem prime style={{ width: "auto", margin: "0 .175em" }}>
          <NavModal unmarked with={HINTS.SUBMIT}>
            <u>
              Submit<HideOnPhablet> for Review</HideOnPhablet>
            </u>
          </NavModal>
        </NavItem>
      </NavWrapper>
      <TitleCreator
      // pageTitle={TITLE_PLACEHOLDER.title}
      // pageSubtitle={TITLE_PLACEHOLDER.subtitle}
      />
      <EditorSection
      // onClick={() => props.requestEditorFocus()}
      >
        {isClientEnv && <Composer />}
      </EditorSection>
    </ArticleWrapper>
  );
};
