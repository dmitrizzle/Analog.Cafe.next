import { FrenchPress } from "@roast-cms/french-press-editor";
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";

import { setComposerSatus } from "../../../store/actions-composer";
import CapitalA from "../../../icons/CapitalA";
import EditorButton from "./components/EditorButton";
import Link from "../../../../core/components/controls/Link";
import Picture from "../../../../core/components/vignettes/Picture";
import ResizeImageKey from "./plugins/resizeImageKey";

const Composer = props => {
  // respond to editor focus requests via store
  const [editorElement, setEditorElement] = useState();
  const editorRef = editor => !editorElement && setEditorElement(editor);
  useEffect(() => {
    editorElement && editorElement.focus();
  }, [props.composer.focusRequested]);

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
      callbackStatus={props.setComposerSatus}
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

const mapDispatchToProps = dispatch => {
  return {
    setComposerSatus: status => {
      dispatch(setComposerSatus(status));
    },
  };
};
const mapStateToProps = ({ composer }) => {
  return {
    composer,
    // user: state.user
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Composer);
