import { getFroth } from "@roast-cms/image-froth";

import { API } from "../../constants/routes";
import { CARD_ERRORS, TEXT_ERRORS } from "../../constants/messages/errors";
import { initModal, setModal } from "./actions-modal";
import puppy from "../../utils/puppy";

const getFirstNameFromFull = a => a;

const UNKNOWN_AUTHOR = (id, error) => {
  return {
    type: "PICTURE.GET_INFO",
    payload: {
      info: {
        author: {
          name: CARD_ERRORS.PICTURE_AUTHOR.name,
          id: "unknown",
          error:
            !error.response || !error.response.status
              ? TEXT_ERRORS.CODE_204.error
              : error,
        },
      },
      status: "fail",
      id,
    },
  };
};
export const getPictureInfo = src => {
  let id = getFroth(src);
  let request;
  request = {
    url: API.IMAGES + "/" + id,
  };
  return async (dispatch, getState) => {
    let picturesState = getState().picture;
    if (picturesState[id]) return;

    dispatch(
      initModal({
        requested: request,
        hidden: true,
        status: "initializing",
      })
    );

    // get picture data
    await puppy(request)
      .then(r => r.json())
      .then(async response => {
        if (response.status === "ok") {
          const { author } = response.info;
          const authorLinkButton = {
            to: `/is/${author.id}`,
            text: `Image by [${getFirstNameFromFull(author.name)}]`,
            inverse: true,
            onClick: () => {
              // GA.event({
              //   category: "Navigation",
              //   action: "Picture.author_profile",
              //   label: src,
              // });
            },
          };

          // add author's chosen link button
          if (author.id) {
            let request = {
              url: API.AUTHORS + "/" + author.id,
            };
            await puppy(request)
              .then(r => r.json())
              .then(response => {
                const authorCTA =
                  response.status === "ok" && response.info.buttons[1]
                    ? {
                        to: response.info.buttons[1].to,
                        text: response.info.buttons[1].text
                          .replace("Me", "Author")
                          .replace("My", "Author’s"),
                        onClick: () => {
                          // GA.event({
                          //   category: "Campaign",
                          //   action: "Picture.author_cta"
                          // })
                        },
                        animationUnfold: true,
                      }
                    : {
                        to: "",
                        text: "",
                      };

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
              });
          } else
            dispatch(
              setModal(
                {
                  info: {
                    image: src,
                    buttons: [{ ...authorLinkButton, animationUnfold: true }],
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
        } else dispatch(UNKNOWN_AUTHOR(id));
      })
      .catch(error => dispatch(UNKNOWN_AUTHOR(id, error)));
  };
};
