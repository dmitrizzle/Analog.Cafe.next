import { getFroth } from "@roast-cms/image-froth";
import React from "react";

import { API } from "../../constants/router/defaults";
import { CARD_ERRORS } from "../../constants/messages/errors";
import { CoffeeInline } from "../components/icons/Coffee";
import { eventGA } from "../../utils/data/ga";
import { getFirstNameFromFull } from "../../utils/author-credits";
import { initModal, setModal } from "./actions-modal";
import puppy from "../../utils/puppy";

export const getPictureInfo = src => {
  const errorModal = {
    info: CARD_ERRORS.PICTURE_AUTHOR,
    status: "error",
    id,
  };
  let id = getFroth(src);
  let request;
  request = {
    url: API.IMAGES + "/" + id,
  };

  return async (dispatch, getState) => {
    dispatch(
      initModal({
        hidden: true,
        status: "loading",
      })
    );

    // get picture data
    await puppy(request)
      .then(r => r.json())
      .then(async response => {
        if (response.status === "ok") {
          // if author has ID, associate details with store object
          const author =
            (response.info.author.id
              ? getState().article.authors.filter(
                  author => author.id === response.info.author.id
                )[0]
              : response.info.author) || response.info.author;
          const authorFirstName = getFirstNameFromFull(
            author.name || author.title || ""
          );

          const authorLinkButton = {
            to: `/is/${author.id || "not-listed"}`,
            text: `Image by [${authorFirstName}]`,
            inverse: true,
            onClick: () => {
              eventGA({
                category: "Navigation",
                action: "Picture.author_profile",
                label: src,
              });
            },
          };

          // button text special CTAs
          const buttonText =
            author.buttons && author.buttons[1] ? author.buttons[1].text : "";

          const ctaText = buttonText
            .replace("Me", authorFirstName)
            .replace("My", authorFirstName + "’s");

          const isCoffee = ctaText.includes("Coffee");
          const isForbidden =
            isCoffee && author.role && author.role === "member";

          const authorCTA =
            !isForbidden && author.buttons && author.buttons[1]
              ? {
                  to: author.buttons[1].to,
                  branded: isCoffee,
                  text: (
                    <span>
                      {ctaText}
                      {isCoffee ? <CoffeeInline /> : ""}
                    </span>
                  ),
                  onClick: () => {
                    eventGA({
                      category: "Campaign",
                      action: isCoffee
                        ? "Picture.author_cta_coffee"
                        : "Picture.author_cta",
                    });
                  },
                  animationUnfold: true,
                }
              : undefined;

          dispatch(
            setModal(
              {
                info: {
                  image: src,
                  buttons: [authorLinkButton, authorCTA],
                  headless: true,
                },
                status: response.status,
                id,
              },
              {
                url: "hints/image-author",
              }
            )
          );
        } else {
          dispatch(
            setModal(errorModal, {
              url: "hints/image-author",
            })
          );
        }
      })
      .catch(() =>
        dispatch(
          setModal(errorModal, {
            url: "hints/image-author",
          })
        )
      );
  };
};
