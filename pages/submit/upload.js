import "localforage-getitems";

import { NextSeo } from "next-seo";
import { connect } from "react-redux";
import {
  loadTextContent,
  loadContent,
} from "@roast-cms/french-press-editor/dist/utils/storage";
import React, { useState } from "react";
import localForage from "localforage";

import { loadHeader } from "../../utils/storage/ls-composer";
import ArticleSection from "../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import HeaderLarge from "../../core/components/vignettes/HeaderLarge";
import Link from "../../core/components/controls/Link";
import Main from "../../core/components/layouts/Main";
import SignIn from "../../user/components/pages/Account/SignIn";
import base64ToBlob from "../../utils/base-64-to-blob";
import isIncompleteDraft from "../../utils/editor/is-incomplete-draft";
import uploadDraft from "../../utils/editor/upload-draft";

const Upload = ({ user, composer }) => {
  // gather submission data
  const content = loadContent();
  const header = loadHeader();
  const textContent = loadTextContent();

  // if we're editing existing submission, this is its id
  const { id, status } = composer.data;

  // create form data for submission transaction
  const data = new FormData();
  data.append("header", JSON.stringify(header));
  data.append("content", JSON.stringify(content));
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
  const [hasUploadFailed, handleError] = useState(isIncompleteDraft());

  // find image keys to local DB (if any)
  const keys = content.document.nodes
    .filter(node => !!(node.data && node.data.key))
    .map(node => node.data.key);

  // fetch image srcs in content (if any)
  // const srcs = content.document.nodes
  //   .filter(node => !!(node.data && node.data.src))
  //   .map(node => node.data.src);

  // upload draft with images from local database
  if (uploadProgress === 0 && !hasUploadFailed) {
    keys.length > 0 // if there are images to be uploaded, they have to be added to the upload form
      ? localForage
          .getItems(keys)
          .then(results => {
            // append image data to request
            keys.forEach(k => {
              data.append("images[" + k + "]", base64ToBlob(results[k]));
            });
          })
          .then(() => {
            // content and all images are ready to be uploaded
            uploadDraft({
              data,
              setUploadProgress,
              id,
              status,
              handleError,
            });
          })
      : // if there are no new images to be uploaded, the process is expidited
        uploadDraft({
          data,
          setUploadProgress,
          id,
          status,
          handleError,
        });
  }

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

  const seo = {
    title: `${Math.round(uploadProgress)}%`,
    subtitle: uploadProgress === 100 ? "Done!" : "Uploading",
  };

  return (
    <>
      <NextSeo title={seo.title + " " + seo.subtitle} />
      <Main>
        <ArticleWrapper>
          {hasUploadFailed ? (
            <SubmissionFailed />
          ) : (
            <>
              <HeaderLarge pageTitle={seo.title} pageSubtitle={seo.subtitle} />
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
    </>
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
    <>
      <NextSeo title={"Upload Submission"} />
      <SignIn loginAction="/submit/upload" />
    </>
  ) : (
    <UploadWithRedux />
  );
};
