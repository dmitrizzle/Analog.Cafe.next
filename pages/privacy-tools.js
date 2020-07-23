import { NextSeo } from "next-seo";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import lscache from "lscache";

import { b_mobile } from "../constants/styles/measurements";
import { themeOptions } from "../constants/styles/themes";
import { withRedux } from "../utils/with-redux";
import ArticleSection from "../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../core/components/pages/Article/components/ArticleWrapper";
import Button from "../core/components/controls/Button";
import CardIntegrated from "../core/components/controls/Card/components/CardIntegrated";
import HeaderLarge from "../core/components/vignettes/HeaderLarge";
import Main from "../core/components/layouts/Main";

const LS_FULL_STORY = "fullstory-enabled";
const LS_GA = "ga-enabled";

export default withRedux(() => {
  const theme = useSelector(({ theme }) => theme);

  const resetFontsize = { fontSize: "1em" };
  const seo = {
    title: "Privacy Tools",
    description:
      "Adjust your privacy settings for Analog.Cafe website experience on this device.",
  };

  const [fullStory, setFullStory] = useState(false);
  const [ga, setGa] = useState(false);

  let saveSettings = s => {
    if (!process.browser) return;

    if (typeof s.fullStory !== "undefined") {
      setFullStory(s.fullStory);
      lscache.set(LS_FULL_STORY, s.fullStory);
    }
    if (typeof s.ga !== "undefined") {
      setGa(s.ga);
      lscache.set(LS_GA, s.ga);
    }

    window.location.reload();
  };

  useEffect(() => {
    if (process.browser) {
      const lsGa = lscache.get(LS_GA);
      const lsFs = lscache.get(LS_FULL_STORY);
      setFullStory(!lsFs || lsFs !== "false");
      setGa(!lsGa || lsGa !== "false");
    }
  });

  return (
    <>
      <NextSeo title={seo.title} description={seo.description} />
      <Main title={seo.title}>
        <ArticleWrapper>
          <HeaderLarge pageTitle={seo.title} />
          <ArticleSection>
            <p>
              Google Analytics and FullStory is used by Analog.Cafe to
              anonymously (individual users can not be identified) determine how
              the readers are using the website and how the website experience
              could be improved based on those findings.
            </p>
            <p>
              Analog.Cafe will store your preferences in your browser’s{" "}
              <em>LocalStorage</em> (not a cookie) and remember them
              indefinitely, as long as your browser or you do not choose to
              remove that data.
            </p>
            <CardIntegrated
              style={{
                maxWidth: b_mobile,
                margin: "0 auto 1px",
                boxShadow: `0 0 0 1x ${themeOptions[theme].grey_med}`,
              }}
            >
              <Button
                onClick={event => {
                  event.target.blur();
                  saveSettings({ ga: !ga });
                }}
                inverse={ga}
                style={resetFontsize}
              >
                Google Analytics:
                {ga ? " ON" : " OFF"}
              </Button>
              <Button
                onClick={event => {
                  event.target.blur();
                  saveSettings({ fullStory: !fullStory });
                }}
                inverse={fullStory}
                style={resetFontsize}
              >
                FullStory: {fullStory ? " ON" : " OFF"}
              </Button>
            </CardIntegrated>
          </ArticleSection>
        </ArticleWrapper>
      </Main>
    </>
  );
});
