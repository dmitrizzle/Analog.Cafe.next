import { storeContentState } from "@roast-cms/french-press-editor/dist/utils/storage";
import React from "react";
import Router from "next/router";

import { API } from "../constants/router/defaults";
import { loadHeader, saveHeader } from "./storage";
import { turnicateSentence } from "./author-credits";
import puppy from "./puppy";

export const sendToComposer = (event, props) => {
  event.preventDefault();
  const draftTitle = loadHeader().title;
  const draftBody = localStorage.getItem("composer-content-text");

  const { title, subtitle, content, id } = props.article;

  const copyDraft = () => {
    // store article state into LS
    saveHeader({ title, subtitle });
    storeContentState(content.raw);
    props.setSubmissionId(id);

    // redirect
    Router.push("/submit/draft");
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
            to: "/submit/draft",
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
      id: "hints/edit",
    });
  }
  copyDraft();
};

export const publishArticle = (event, props) => {
  event.preventDefault();

  const isUpdate = props.article.status === "published";

  const publish = (id, tag) => {
    const request = {
      url: `${API.SUBMISSIONS}/${id}/approve`,
      method: "post",
      data: {
        scheduledOrder: 0, // 0 = immediately (other options include scheduling and aren't implemented)
        tag,
      },
      headers: {
        Authorization: "JWT " + localStorage.getItem("token"),
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    console.log(request);
    puppy(request)
      .then(r => r.json())
      .then(response => {
        console.log(response);
      });
  };

  const confirmModal = topic =>
    props.setModal({
      status: "ok",
      id: "hints/publish-confirm",
      info: {
        title: "Please Confirm",
        text: () => (
          <div>
            You are about to publish <strong>“{props.article.title}”</strong> as{" "}
            <strong>{topic}</strong>.
          </div>
        ),
        buttons: [
          {
            to: "#confirm",
            text: "Confirm",
            branded: true,
            onClick: event => {
              event.preventDefault();
              publish(props.article.id, topic);
            },
          },
          {
            to: "#cancel",
            text: "Cancel",
            onClick: event => {
              event.preventDefault();
            },
          },
        ],
      },
    });

  return props.setModal({
    status: "ok",
    info: {
      title: `${isUpdate ? "Update" : "Publish"} As`,
      buttons: [
        {
          to: "#photo-essay",
          onClick: event => {
            event.preventDefault();
            props.hideModal();
            window.requestAnimationFrame(() => confirmModal("photo-essay"));
          },
          text: "Photo Essay",
        },
        {
          to: "#film-photography",
          onClick: event => {
            event.preventDefault();
            props.hideModal();
            window.requestAnimationFrame(() =>
              confirmModal("film-photography")
            );
          },
          text: "Film Photography",
        },
        {
          to: "#editorial",
          onClick: event => {
            event.preventDefault();
            props.hideModal();
            window.requestAnimationFrame(() => confirmModal("editorial"));
          },
          text: "Editorial",
        },
        {
          to: "#download",
          onClick: event => {
            event.preventDefault();
            props.hideModal();
            window.requestAnimationFrame(() => confirmModal("download"));
          },
          text: "Download",
        },
      ],
    },
    id: "hints/publish",
  });
};
