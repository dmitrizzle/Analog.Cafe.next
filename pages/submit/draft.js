import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { HINTS } from "../../user/components/pages/Composer/constants";
import { HideOnPhablet } from "../../core/components/controls/Nav";
import { NavModal } from "../../core/components/controls/Nav/components/NavMenu";
import { c_black, c_grey_dark } from "../../constants/styles/colors";
import ArticleSection from "../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import Button from "../../core/components/controls/Button";
import Composer from "../../user/components/pages/Composer";
import EditorSection from "../../user/components/pages/Composer/components/EditorSection";
import NavItem from "../../core/components/controls/Nav/components/NavItem";
import NavWrapper from "../../core/components/controls/Nav/components/NavWrapper";
import Spinner from "../../core/components/icons/Spinner";
import TitleCreator from "../../user/components/pages/Composer/components/TitleCreator";

const NavEditorWrapper = styled(NavWrapper)`
  display: flex;
  justify-content: center;
  margin: 0;
`;
const NavEditorItem = styled(NavItem)`
  width: auto !important;
  margin: 0 0.175em;
`;
const LoaderWrapper = styled.div`
  width: 1em;
  margin: 0 auto;
  svg {
    margin: 0;
    display: block;
    path {
      stroke: ${c_black};
    }
  }
`;
export default () => {
  const [isClientEnv, updateEnv] = useState(false);
  useEffect(() => {
    updateEnv(true);
  });
  return isClientEnv ? (
    <ArticleWrapper className="fs-block">
      <NavEditorWrapper>
        <NavEditorItem prime>
          <NavModal unmarked with={HINTS.SAVE}>
            Saved
          </NavModal>
        </NavEditorItem>
        <NavEditorItem prime>
          <NavModal unmarked with={HINTS.HELP}>
            Help
          </NavModal>
        </NavEditorItem>
        <NavEditorItem prime>
          <NavModal unmarked with={HINTS.SUBMIT}>
            <u>
              Submit<HideOnPhablet> for Review</HideOnPhablet>
            </u>
          </NavModal>
        </NavEditorItem>
      </NavEditorWrapper>
      <TitleCreator
      // pageTitle={TITLE_PLACEHOLDER.title}
      // pageSubtitle={TITLE_PLACEHOLDER.subtitle}
      />
      <EditorSection
      // onClick={() => props.requestEditorFocus()}
      >
        {<Composer />}
      </EditorSection>
      <Button branded style={{ fontSize: "1em" }}>
        Submit for Review
      </Button>
      <p style={{ textAlign: "center", color: c_grey_dark }}>
        <em>Your draft is saved. You’ve written X words.</em>
      </p>
    </ArticleWrapper>
  ) : (
    <LoaderWrapper>
      <Spinner />
    </LoaderWrapper>
  );
};
