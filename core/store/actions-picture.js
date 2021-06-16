import { getFroth } from "@roast-cms/image-froth";
import React from "react";

import { API, DOMAIN } from "../../constants/router/defaults";
import { CARD_ERRORS } from "../../constants/messages/errors";
import { HeartInline } from "../components/icons/Heart";
import { getFirstNameFromFull } from "../../utils/author-credits";
import { initModal, setModal } from "./actions-modal";
import { makeFroth } from "../../utils/froth";
import Pinterest from "../components/icons/Pinterest";
import ga from "../../utils/data/ga";
import puppy from "../../utils/puppy";

export const getPictureInfo = (src, caption) => {
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
              ? getState().article.authors?.filter(
                  author =>
                    author.id === response.info.author.id &&
                    author.id !== "unlisted"
                )[0]
              : response.info.author) || response.info.author;

          const authorFirstName = getFirstNameFromFull(
            author.name || author.title || ""
          );

          const authorLinkButton = {
            to: `/is/${author.id || "not-listed"}`,
            text: <>ⓒ {author.name || author.title}</>,
            onClick: () => {
              ga("event", {
                category: "nav",
                action: "picture.modal.profile",
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
                  text: (
                    <>
                      {isCoffee && (
                        <>
                          <small>
                            <HeartInline branded />
                          </small>{" "}
                        </>
                      )}
                      {ctaText}
                    </>
                  ),

                  onClick: () => {
                    ga("event", {
                      category: "out",
                      action: isCoffee
                        ? "picture.modal.cta.coffee"
                        : "picture.modal.cta",
                    });
                  },
                  animationUnfold: true,
                }
              : undefined;

          const pictureSaveToPinterest = {
            to: `http://pinterest.com/pin/create/button/?url=${encodeURIComponent(
              DOMAIN.PROTOCOL.PRODUCTION +
                DOMAIN.APP.PRODUCTION +
                "/r/" +
                getState().article?.slug
            )}&media=${encodeURIComponent(
              makeFroth({ src, size: "m" }).src
            )}&description=${encodeURIComponent(
              `Image by ${author.name || author.title}. ${caption || ""}`
            )}`,
            text: (
              <>
                <Pinterest
                  style={{
                    width: "1em",
                    margin: "-.25em 0em 0 -.25em",
                  }}
                />{" "}
                Save Image to Pinterest
              </>
            ),
            onClick: () => {
              ga("event", {
                category: "out",
                action: "picture.modal.cta.pinterest",
              });
            },
            animationUnfold: true,
          };

          dispatch(
            setModal(
              {
                info: {
                  image: src,
                  buttons: [
                    authorLinkButton,
                    pictureSaveToPinterest,

                    authorCTA,
                  ],
                  headless: true,
                  ad: true,
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
      .catch(() => {
        return dispatch(
          setModal(errorModal, {
            url: "hints/image-author",
          })
        );
      });
  };
};
