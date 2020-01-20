import React from "react";

import { API } from "../../constants/router/defaults";
import { invalidateArticlePages } from "../server-cache";
import ls from "../storage/ls";
import puppy from "../puppy";

export default props => {
  // error message pop up
  const errorMessage = {
    status: "ok",
    info: {
      title: "Error",
      text: `Could not publish the article.`,
    },
    id: "error/publish-error",
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
        Authorization: "JWT " + ls.getItem("token"),
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
        // clear server cache for related article pages
        invalidateArticlePages(response);

        return props.setModal({
          status: "ok",
          info: {
            title: "Published!",
            buttons: [
              {
                to: "/r/" + response.slug,
                text: "View Published Article",
              },
            ],
          },
          id: "notification/publish-success",
        });
      })
      .catch(() => props.setModal(errorMessage));
  };

  // confirmation message
  const confirmModal = topic =>
    props.setModal({
      status: "ok",
      id: "notification/publish-confirm",
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
          text: "Essays, Stories",
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
          text: "Film, Photography",
        },
        {
          to: "#editorial",
          onClick: event => {
            event.preventDefault();
            props.hideModal();
            window.requestAnimationFrame(() => confirmModal("editorial"));
          },
          text: "Letters, Editorials",
        },
        {
          to: "#link",
          onClick: event => {
            event.preventDefault();
            props.hideModal();
            window.requestAnimationFrame(() => confirmModal("link"));
          },
          text: "Apps & Downloads",
        },
      ],
    },
    id: "notification/publish",
  });
};
