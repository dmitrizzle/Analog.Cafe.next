import { FrenchPress } from "@roast-cms/french-press-editor";
import React from "react";

import CapitalA from "../../../icons/CapitalA";
import EditorButton from "./components/EditorButton";
import Link from "../../../../core/components/controls/Link";
import Picture from "../../../../core/components/vignettes/Picture";

export default props => (
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
);
