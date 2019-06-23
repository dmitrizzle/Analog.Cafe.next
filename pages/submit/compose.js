import { FrenchPress } from "@roast-cms/french-press-editor";
import React from "react";
import styled from "styled-components";

import {
  c_black,
  c_grey_med,
  c_red,
  c_white,
} from "../../constants/styles/colors";
import { paragraph, title } from "../../constants/styles/typography";
import ArticleSection from "../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import CapitalA from "../../user/icons/CapitalA";
import Link from "../../core/components/controls/Link";
import LowerA from "../../user/icons/LowerA";
import Picture from "../../core/components/vignettes/Picture";

const TitleCreator = props => <>{props.children}</>;

const AnalogCafeEditor = styled(ArticleSection)`
  button,
  .fpe-menu button {
    ${title}
    letter-spacing: 0.025em;
    line-height: 1.75em;

    background: ${c_red};
    color: ${c_white};
    padding: 0.1em 0.45em 0.15em;
    border-left-color: ${c_grey_med} !important;
  }
  button:active,
  button.active {
  }
`;
const EditorMenuStyleButton = styled.span`
  ${paragraph};
`;

export default () => {
  return (
    <ArticleWrapper className="fs-block">
      <TitleCreator
      // pageTitle={TITLE_PLACEHOLDER.title}
      // pageSubtitle={TITLE_PLACEHOLDER.subtitle}
      />
      <AnalogCafeEditor
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
                <EditorMenuStyleButton>
                  <u>link</u>
                </EditorMenuStyleButton>
              ),
              MakeBold: () => (
                <EditorMenuStyleButton>
                  <strong>bold</strong>
                </EditorMenuStyleButton>
              ),
              MakeItalic: () => (
                <EditorMenuStyleButton>
                  <em>italic</em>
                </EditorMenuStyleButton>
              ),
              UploadImage: () => <span>↫ Add Image</span>,
            }}
          />
        ) : (
          <div></div>
        )}
      </AnalogCafeEditor>
    </ArticleWrapper>
  );
};
