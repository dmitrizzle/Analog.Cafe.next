import React from "react";

import { API } from "../../constants/router/defaults";
import puppy from "../puppy";

export default (event, props) => {
  console.log("publish-article.js");
  event.preventDefault();

  // error message pop up
  const errorMessage = {
    status: "ok",
    info: {
      title: "Error",
      text: `Could not publish the article.`,
    },
    id: "hints/publish-error",
  };

  // publish action
  const publish = (id, tag) => {
    const request = {
      url: `${API.SUBMISSIONS}/${id}/approve`,
      method: "post",
      data: {
        // 0 = immediately (other options include scheduling and aren't implemented)
        scheduledOrder: 0,
        tag,
      },
      headers: {
        Authorization: "JWT " + localStorage.getItem("token"),
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    puppy(request)
      .then(r => {
        // reject and show error message if response status isn't success
        if (r.status !== 200) {
          r.reject();
          return props.setModal(errorMessage);
        }
        return r.json();
      })
      .then(response => {
        return props.setModal({
          status: "ok",
          info: {
            title: "Published!",
          },
          id: "hints/publish-success",
        });
      })
      .catch(() => props.setModal(errorMessage));
  };

  // confirmation message
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

  // menu to select publication topic/tag
  return props.setModal({
    status: "ok",
    info: {
      title: `Publish As`,
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
