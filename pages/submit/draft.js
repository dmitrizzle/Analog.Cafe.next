import React, { useEffect, useState } from "react";

import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import Composer from "../../user/components/pages/Composer";
import ComposerFooter from "../../user/components/pages/Composer/components/ComposerFooter";
import ComposerNav from "../../user/components/pages/Composer/components/ComposerNav";
import EditorSection from "../../user/components/pages/Composer/components/EditorSection";
import Footer from "../../core/components/layouts/Main/components/Footer";
import Loader from "../../user/components/pages/Composer/components/Loader";
import TitleCreator from "../../user/components/pages/Composer/components/TitleCreator";

export default () => {
  const [isClientEnv, updateEnv] = useState(false);
  useEffect(() => {
    updateEnv(true);
  });
  return (
    <>
      {isClientEnv ? (
        <ArticleWrapper className="fs-block">
          <ComposerNav />
          <TitleCreator
          // pageTitle={TITLE_PLACEHOLDER.title}
          // pageSubtitle={TITLE_PLACEHOLDER.subtitle}
          />
          <EditorSection
          // onClick={() => props.requestEditorFocus()}
          >
            <Composer />
          </EditorSection>
          <ComposerFooter />
        </ArticleWrapper>
      ) : (
        <Loader />
      )}
      <Footer />
    </>
  );
};
