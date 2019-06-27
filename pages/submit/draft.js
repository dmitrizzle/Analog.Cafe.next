import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { HINTS } from "../../user/components/pages/Composer/constants";
import { HideOnPhablet } from "../../core/components/controls/Nav";
import { NavModal } from "../../core/components/controls/Nav/components/NavMenu";
import { c_black, c_grey_dark } from "../../constants/styles/colors";
import ArticleSection from "../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import Composer from "../../user/components/pages/Composer";
import EditorSection from "../../user/components/pages/Composer/components/EditorSection";
import Email from "../../core/components/vignettes/Email";
import Footer from "../../core/components/layouts/Main/components/Footer";
import Link from "../../core/components/controls/Link";
import Modal from "../../core/components/controls/Modal";
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
export const StyledUl = styled.ul`
  list-style: disc;
  li {
    padding: 0 !important;
  }
`;
export default () => {
  const [isClientEnv, updateEnv] = useState(false);
  useEffect(() => {
    updateEnv(true);
  });
  return (
    <>
      {isClientEnv ? (
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
          <Modal
            with={HINTS.SUBMIT}
            element="Button"
            branded
            style={{ fontSize: "1em" }}
          >
            Submit for Review
          </Modal>
          <p style={{ textAlign: "center", color: c_grey_dark }}>
            <em>
              Your draft is <Modal with={HINTS.SAVE}>saved</Modal>. You’ve
              written X words.
            </em>
          </p>
        </ArticleWrapper>
      ) : (
        <ArticleWrapper>
          <ArticleSection>
            <LoaderWrapper>
              <Spinner />
            </LoaderWrapper>
            <p>
              <strong>
                Please ensure you are using latest version of your browser.
              </strong>
            </p>
            <p>
              Android and Internet Explorer users beware: your browsers are not
              supported. Please <Email /> if you need help or would like to
              submit your work over email.
            </p>
            <noscript>
              <h3>Error:</h3>
              <p>
                It seems that your browser does not support JavaScript. Here are
                some things you can do:
              </p>
              <StyledUl>
                <li>
                  <Link to="https://enable-javascript.com/">
                    Enable JavaScript
                  </Link>
                  .
                </li>
                <li>
                  <Link to="https://updatemybrowser.org/">
                    Update your browser
                  </Link>
                  .
                </li>
                <li>Try another device or computer.</li>
              </StyledUl>
            </noscript>
          </ArticleSection>
        </ArticleWrapper>
      )}
      <Footer />
    </>
  );
};
