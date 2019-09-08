import "localforage-getitems";

import { connect } from "react-redux";
import {
  loadTextContent,
  loadContent,
} from "@roast-cms/french-press-editor/dist/utils/storage";
import React, { useState } from "react";
import localForage from "localforage";

import { base64ToBlob, loadHeader } from "../../utils/storage";
import { uploadDraft } from "../../utils/composer";
import ArticleSection from "../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import HeaderLarge from "../../core/components/vignettes/HeaderLarge";
import Link from "../../core/components/controls/Link";
import Main from "../../core/components/layouts/Main";
import SignIn from "../../user/components/pages/Account/SignIn";

const Upload = ({ user, composer }) => {
  // gather submission data
  const content = loadContent();
  const header = loadHeader();
  const textContent = loadTextContent();

  // if we're editing existing submission, this is its id
  const { submissionId } = composer;
  console.log("submissionId", submissionId);

  // create form data for submission transaction
  const data = new FormData();
  data.append("content", JSON.stringify(content));
  data.append("header", JSON.stringify(header));
  data.append("textContent", textContent);
  data.append("isFullConsent", true); // should always be true, this setting isn't really used atm but should be filled
  data.append(
    "editedBy",
    JSON.stringify({
      id: user && user.info ? user.info.id : "unknown",
      name: user && user.info ? user.info.title : "Unknown",
    })
  );

  // prepare upload progress indicator data
  const [uploadProgress, setUploadProgress] = useState(0);

  // handle upload errors
  const [hasUploadFailed, handleError] = useState(false);

  // upload draft with images from local database
  const keys = content.document.nodes
    .filter(node => !!(node.data && node.data.key))
    .map(node => node.data.key);
  keys.length > 0 &&
    uploadProgress === 0 &&
    localForage.getItems(keys).then(results => {
      keys.forEach(k => {
        data.append("images[" + k + "]", base64ToBlob(results[k]));
      });
      // requestAnimationFrame for a slight delay && ensure that we aren't uploading same thing twice
      typeof window !== "undefined" &&
        window.requestAnimationFrame(() =>
          uploadDraft({
            data,
            setUploadProgress,
            submissionId,
            handleError,
          })
        );
    });

  // upload draft with images srcs
  const srcs = content.document.nodes
    .filter(node => !!(node.data && node.data.src))
    .map(node => node.data.src);
  srcs.length > 0 &&
    uploadProgress === 0 &&
    typeof window !== "undefined" &&
    window.requestAnimationFrame(() =>
      uploadDraft({
        data,
        setUploadProgress,
        submissionId,
        handleError,
      })
    );

  // link back to user account
  const YourAccount = () => (
    <strong>
      <Link to="/account">your account</Link>
    </strong>
  );

  // error view when submission failes
  const SubmissionFailed = () => (
    <>
      <HeaderLarge pageTitle="Error" pageSubtitle="Upload Failed" />
      <ArticleSection>
        <p>
          Please go back and <Link to="/submit/draft">try again</Link> or return
          to <YourAccount />.
        </p>
      </ArticleSection>
    </>
  );

  return (
    <Main>
      <ArticleWrapper>
        {hasUploadFailed ? (
          <SubmissionFailed />
        ) : (
          <>
            <HeaderLarge
              pageTitle={`${uploadProgress}%`}
              pageSubtitle={uploadProgress === 100 ? "Done!" : "Uploading"}
            />
            <ArticleSection>
              {uploadProgress === 100 ? (
                <p>
                  All done! Now you can go back to <YourAccount />.
                </p>
              ) : (
                <p>
                  Please <strong>do not</strong> close this window, or press
                  your browser’s back button.
                </p>
              )}
            </ArticleSection>
          </>
        )}
      </ArticleWrapper>
    </Main>
  );
};

const UploadWithRedux = connect(
  ({ user, composer }) => {
    return { user, composer };
  },
  null
)(Upload);

export default () => {
  return typeof localStorage === "undefined" ||
    !localStorage.getItem("token") ? (
    <SignIn />
  ) : (
    <UploadWithRedux />
  );
};
