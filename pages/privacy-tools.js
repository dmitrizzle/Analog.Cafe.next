import { NextSeo } from "next-seo";
import React, { useState, useEffect } from "react";

import { b_mobile } from "../constants/styles/measurements";
import ArticleSection from "../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../core/components/pages/Article/components/ArticleWrapper";
import Button from "../core/components/controls/Button";
import CardIntegrated from "../core/components/controls/Card/components/CardIntegrated";
import HeaderLarge from "../core/components/vignettes/HeaderLarge";
import Main from "../core/components/layouts/Main";
import ls from "../utils/storage/ls";

const LS_FULL_STORY = "fullstory-enabled";
const LS_GA = "ga-enabled";

export default () => {
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
      ls.setItem(LS_FULL_STORY, s.fullStory);
    }
    if (typeof s.ga !== "undefined") {
      setGa(s.ga);
      ls.setItem(LS_GA, s.ga);
    }

    window.location.reload();
  };

  useEffect(() => {
    if (process.browser) {
      const lsGa = ls.getItem(LS_GA);
      const lsFs = ls.getItem(LS_FULL_STORY);
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
                margin: "0px auto 1px",
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
};
