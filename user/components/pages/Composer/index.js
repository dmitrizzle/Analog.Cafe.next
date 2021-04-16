import { FrenchPress } from "@roast-cms/french-press-editor";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import { CARD_ERRORS } from "../../../../constants/messages/errors";
import { setComposerEditStatus } from "../../../store/actions-composer";
import { setModal } from "../../../../core/store/actions-modal";
import { withRedux } from "../../../../utils/with-redux";
import ArticleSection from "../../../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../../../core/components/pages/Article/components/ArticleWrapper";
import CapitalA from "../../../icons/CapitalA";
import EditorButton from "./components/EditorButton";
import Link from "../../../../core/components/controls/Link";
import Main from "../../../../core/components/layouts/Main";
import Picture from "../../../../core/components/vignettes/Picture";
import ResizeImageKey from "./plugins/resizeImageKey";

const Composer = () => {
  const composer = useSelector(state => state.composer);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  console.log("user", user);

  // respond to editor focus requests via store
  const [editorElement, setEditorElement] = useState();
  const editorRef = editor => !editorElement && setEditorElement(editor);
  useEffect(() => {
    editorElement && editorElement.focus();
  }, [composer.focusRequested]);

  // image size restrictions warning
  const imageRestrictions = error => {
    error === "insert_image" &&
      dispatch(
        setModal(
          {
            status: "ok",
            info: CARD_ERRORS.IMAGE_SIZE(10),
          },
          { url: "errors/upload" }
        )
      );
  };

  if (user?.info?.suspend)
    return (
      <p style={{ textAlign: "center" }}>Your account has beensuspended.</p>
    );

  return (
    <FrenchPress
      editorRef={editorRef}
      placeholder="Write & add images…"
      components={{
        Picture,
        Link,
      }}
      options={{
        imageMaxSize: 10,
      }}
      slatePlugins={[ResizeImageKey({ key: "f", node: "image" })]}
      callbackStatus={status => dispatch(setComposerEditStatus(status))}
      callbackError={imageRestrictions}
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
};

export default withRedux(Composer);
