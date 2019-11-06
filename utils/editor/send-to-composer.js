import { storeContentState } from "@roast-cms/french-press-editor/dist/utils/storage";
import React from "react";
import Router from "next/router";

import { loadHeader, saveHeader } from "../storage/ls-composer";
import { turnicateSentence } from "../author-credits";

export default props => {
  const draftTitle = loadHeader().title;
  const draftBody = localStorage.getItem("composer-content-text");

  const {
    title,
    subtitle,
    content,
    id,
    status,
    slug,
    tag,
    submittedBy,
  } = props.article;

  const copyDraft = () => {
    // store article state into LS
    saveHeader({ title, subtitle });
    storeContentState(content.raw);

    props.addComposerData({
      id,
      status,
      slug,
      tag,
      submittedBy,
    });

    // redirect
    Router.push("/write/draft");
  };

  if (draftTitle || draftBody) {
    return props.setModal({
      status: "ok",
      info: {
        title: "Overwrite Current Draft?",
        text: () => (
          <div>
            <h4>{draftTitle || "Untitled"}</h4>
            {turnicateSentence(draftBody, 120)}
          </div>
        ),
        buttons: [
          {
            to: "/write/draft",
            onClick: event => {
              event.preventDefault();
              copyDraft();
            },
            text: "Overwrite",
            branded: true,
          },
          {
            to: "#cancel",
            onClick: event => {
              event.preventDefault();
            },
            text: "Cancel",
          },
        ],
      },
      id: "notification/edit",
    });
  }
  copyDraft();
};
