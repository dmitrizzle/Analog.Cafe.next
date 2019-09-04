import { connect } from "react-redux";
import React, { useEffect, useState } from "react";

import { loadHeader } from "../../utils/storage";
import { requestComposerFocus } from "../../user/store/actions-composer";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import ClientLoader from "../../core/components/layouts/Main/components/ClientLoader";
import Composer from "../../user/components/pages/Composer";
import ComposerFooter from "../../user/components/pages/Composer/components/ComposerFooter";
import ComposerNav from "../../user/components/pages/Composer/components/ComposerNav";
import EditorSection from "../../user/components/pages/Composer/components/EditorSection";
import Footer from "../../core/components/layouts/Main/components/Footer";
import TitleCreator from "../../user/components/pages/Composer/components/TitleCreator";
import {
  loadTextContent,
  loadContent,
} from "@roast-cms/french-press-editor/dist/utils/storage";

const Draft = props => {
  const [isClientEnv, updateEnv] = useState(false);
  useEffect(() => {
    updateEnv(true);
  });

  const data =
    typeof localStorage === "undefined"
      ? {}
      : {
          header: loadHeader(),
          plaintext: loadTextContent(),
          content: loadContent(),
        };

  return (
    <>
      {isClientEnv ? (
        <ArticleWrapper className="fs-block">
          <ComposerNav data={data} />
          <TitleCreator />
          <EditorSection onClick={() => props.requestComposerFocus()}>
            <Composer />
          </EditorSection>
          <ComposerFooter data={data} />
        </ArticleWrapper>
      ) : (
        <ClientLoader title="Analog.Cafe Composer" />
      )}
      <Footer />
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    requestComposerFocus: () => {
      dispatch(requestComposerFocus());
    },
  };
};
export default connect(
  ({ composer }) => {
    return { composer };
  },
  mapDispatchToProps
)(Draft);
