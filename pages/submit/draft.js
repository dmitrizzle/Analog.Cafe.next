import { connect } from "react-redux";
import React, { useEffect, useState } from "react";

import { requestComposerFocus } from "../../user/store/actions-composer";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import ClientLoader from "../../core/components/layouts/Main/components/ClientLoader";
import Composer from "../../user/components/pages/Composer";
import ComposerFooter from "../../user/components/pages/Composer/components/ComposerFooter";
import ComposerNav from "../../user/components/pages/Composer/components/ComposerNav";
import EditorSection from "../../user/components/pages/Composer/components/EditorSection";
import Footer from "../../core/components/layouts/Main/components/Footer";
import TitleCreator from "../../user/components/pages/Composer/components/TitleCreator";

const Draft = props => {
  const [isClientEnv, updateEnv] = useState(false);
  useEffect(() => {
    updateEnv(true);
  });

  return (
    <>
      {isClientEnv ? (
        <ArticleWrapper className="fs-block">
          <ComposerNav />
          <TitleCreator />
          <EditorSection onClick={() => props.requestComposerFocus()}>
            <Composer />
          </EditorSection>
          <ComposerFooter />
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
