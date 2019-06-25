import { FrenchPress } from "@roast-cms/french-press-editor";
import React from "react";

import { HideOnMobile } from "../../core/components/controls/Nav";
import { NavLink } from "../../core/components/controls/Nav/components/NavLinks";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import CapitalA from "../../user/icons/CapitalA";
import EditorButton from "../../user/components/pages/Composer/components/EditorButton";
import EditorSection from "../../user/components/pages/Composer/components/EditorSection";
import Link from "../../core/components/controls/Link";
import NavItem from "../../core/components/controls/Nav/components/NavItem";
import NavWrapper from "../../core/components/controls/Nav/components/NavWrapper";
import Picture from "../../core/components/vignettes/Picture";
import TitleCreator from "../../user/components/pages/Composer/components/TitleCreator";

export default () => {
  return (
    <ArticleWrapper className="fs-block">
      <NavWrapper
        style={{ display: "flex", justifyContent: "center", margin: 0 }}
      >
        <NavItem prime style={{ width: "auto", margin: "0 .25em" }}>
          <NavLink>Saved</NavLink>
        </NavItem>
        <NavItem prime style={{ width: "auto", margin: "0 .25em" }}>
          <NavLink href="/r/open-call-g99w">Help</NavLink>
        </NavItem>
        <NavItem
          prime
          style={{
            width: "auto",
            margin: "0 .25em",
          }}
        >
          <NavLink>
            <HideOnMobile>Ready? </HideOnMobile>
            <u>Send!</u>
          </NavLink>
        </NavItem>
      </NavWrapper>
      <TitleCreator
      // pageTitle={TITLE_PLACEHOLDER.title}
      // pageSubtitle={TITLE_PLACEHOLDER.subtitle}
      />
      <EditorSection
      // onClick={() => props.requestEditorFocus()}
      >
        {process.browser ? (
          <FrenchPress
            placeholder="Write & add images…"
            components={{
              Picture,
              Link,
            }}
            options={{
              imageMaxSize: 10,
            }}
            controls={{
              MakeHeader: () => <CapitalA />,
              CancelHeader: () => <span>Undo Heading</span>,
              MakeQuote: () => <span>❝</span>,
              MakeLink: () => (
                <EditorButton>
                  <u>link</u>
                </EditorButton>
              ),
              MakeBold: () => (
                <EditorButton>
                  <strong>bold</strong>
                </EditorButton>
              ),
              MakeItalic: () => (
                <EditorButton>
                  <em>italic</em>
                </EditorButton>
              ),
              UploadImage: () => <span>↫ Add Image</span>,
            }}
          />
        ) : (
          <div></div>
        )}
      </EditorSection>
    </ArticleWrapper>
  );
};
