import { getFroth } from "@roast-cms/image-froth";

import { API } from "../../constants/routes";
import { CARD_ERRORS } from "../../constants/messages/errors";
import { initModal, setModal } from "./actions-modal";
import puppy from "../../utils/puppy";

// NOTE
const getFirstNameFromFull = a => a;

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
          const author = getState().article.authors.filter(
            author => author.id === response.info.author.id
          )[0];

          const authorLinkButton = {
            to: `/is/${author.id || "not-listed"}`,
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
          const authorCTA = author.buttons[1]
            ? {
                to: author.buttons[1].to,
                text: author.buttons[1].text
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
