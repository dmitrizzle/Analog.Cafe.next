import { FrenchPress } from "@roast-cms/french-press-editor";
import React from "react";

import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import CapitalA from "../../user/icons/CapitalA";
import EditorButton from "../../user/components/pages/Composer/components/EditorButton";
import EditorSection from "../../user/components/pages/Composer/components/EditorSection";
import Link from "../../core/components/controls/Link";
import Picture from "../../core/components/vignettes/Picture";

const TitleCreator = props => <>{props.children}</>;

export default () => {
  return (
    <ArticleWrapper className="fs-block">
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
