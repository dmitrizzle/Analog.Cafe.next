import { connect } from "react-redux";
import "localforage-getitems";
import {
  loadTextContent,
  loadContent,
} from "@roast-cms/french-press-editor/dist/utils/storage";
import React from "react";
import localForage from "localforage";

import { base64ToBlob, loadHeader } from "../../utils/storage";
import ArticleSection from "../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import HeaderLarge from "../../core/components/vignettes/HeaderLarge";
import Main from "../../core/components/layouts/Main";
import SignIn from "../../user/components/pages/Account/SignIn";

const Upload = ({ user }) => {
  // gather submission data
  const content = loadContent();
  const header = loadHeader();
  const textContent = loadTextContent();
  // console.log(user.info.id);

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
  // prepare image data for upload
  const keys = content.document.nodes
    .filter(node => !!(node.data && node.data.key))
    .map(node => node.data.key);
  localForage.getItems(keys).then(results => {
    keys.forEach(k => {
      data.append("images[" + k + "]", base64ToBlob(results[k]));
    });
    content.document.nodes
      .filter(node => !!(node.data && node.data.src))
      .forEach(node => (node.data.src = null));
    // send upload
    // sendSubmission(data, this.props)
  });

  return (
    <Main>
      <ArticleWrapper>
        <HeaderLarge pageTitle={"100%"} pageSubtitle="uploading" />
        <ArticleSection>
          <p>
            Please <strong>do not</strong> close this window, or press your
            browser’s back button.
          </p>
        </ArticleSection>
      </ArticleWrapper>
    </Main>
  );
};

const UploadWithRedux = connect(
  ({ user }) => {
    return { user };
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
