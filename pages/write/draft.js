import { NextSeo } from "next-seo";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import { makeFroth } from "../../utils/froth";
import { requestComposerFocus } from "../../user/store/actions-composer";
import { withRedux } from "../../utils/with-redux";
import ArticleSection from "../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import ClientLoader from "../../core/components/layouts/Main/components/ClientLoader";
import Composer from "../../user/components/pages/Composer";
import ComposerFooter from "../../user/components/pages/Composer/components/ComposerFooter";
import ComposerNav from "../../user/components/pages/Composer/components/ComposerNav";
import EditorSection from "../../user/components/pages/Composer/components/EditorSection";
import Footer from "../../core/components/layouts/Main/components/Footer";
import Main from "../../core/components/layouts/Main";
import TitleCreator from "../../user/components/pages/Composer/components/TitleCreator";

const Draft = () => {
  const dispatch = useDispatch();

  const [isClientEnv, updateEnv] = useState(false);
  useEffect(() => {
    updateEnv(true);
  });

  const user = useSelector(state => state.user);

  const seo = {
    title: "Submission Composer",
    description:
      "Analog.Cafe Composer tool makes photo essay and article submissions easy. Add links and font styles. Format your titles, quotes, and images.",
    images: [
      {
        url: makeFroth({
          src: "image-froth_1010453_425a5704760c4879b31e008315c3047c",
          size: "m",
        }).src,
      },
    ],
  };

  if (user?.info?.suspend)
    return (
      <Main>
        <ArticleWrapper>
          <ArticleSection>
            <p style={{ textAlign: "center" }}>
              Your account has beensuspended.
            </p>
          </ArticleSection>
        </ArticleWrapper>
      </Main>
    );

  return (
    <Main>
      <NextSeo
        title={seo.title}
        description={seo.description}
        openGraph={{
          type: "website",
          images: seo.images,
        }}
      />
      {isClientEnv ? (
        <ArticleWrapper className="fs-block">
          <ComposerNav />
          <TitleCreator />
          <EditorSection onClick={() => dispatch(requestComposerFocus())}>
            <Composer />
          </EditorSection>
          <ComposerFooter />
        </ArticleWrapper>
      ) : (
        <ClientLoader title="Analog.Cafe Composer" />
      )}
      <Footer />
    </Main>
  );
};

export default withRedux(Draft);
