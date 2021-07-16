import { getFroth } from "@roast-cms/image-froth";
import React from "react";
import Router from "next/router";

import { API, DOMAIN } from "../../constants/router/defaults";
import { CARD_ERRORS } from "../../constants/messages/errors";
import { addFavourite } from "../../user/store/actions-favourites";
import { addSessionInfo } from "../../user/store/actions-user";
import { bookmarksModal } from "../components/controls/Features/components/PosterBookmarks";
import { initModal, setModal } from "./actions-modal";
import { makeFroth } from "../../utils/froth";
import Bookmark from "../components/icons/Bookmark";
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

          // const authorFirstName = getFirstNameFromFull(
          //   author.name || author.title || ""
          // );

          const authorProfileID =
            author.id.includes("not-listed") || !author.id
              ? "not-listed"
              : author.id;
          const authorLinkButton = {
            to: `/is/${authorProfileID}`,
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
          // const buttonText =
          //   author.buttons && author.buttons[1] ? author.buttons[1].text : "";

          // const ctaText = buttonText
          //   .replace("Me", authorFirstName)
          //   .replace("My", authorFirstName + "’s");
          //
          // const isCoffee = ctaText.includes("Coffee");
          // const isForbidden =
          //   isCoffee && author.role && author.role === "member";
          //
          // const authorCTA =
          //   !isForbidden && author.buttons && author.buttons[1]
          //     ? {
          //         to: author.buttons[1].to,
          //         text: (
          //           <>
          //             {isCoffee && (
          //               <>
          //                 <small>
          //                   <HeartInline branded />
          //                 </small>{" "}
          //               </>
          //             )}
          //             {ctaText}
          //           </>
          //         ),
          //
          //         onClick: () => {
          //           ga("event", {
          //             category: "out",
          //             action: isCoffee
          //               ? "picture.modal.cta.coffee"
          //               : "picture.modal.cta",
          //           });
          //         },
          //         animationUnfold: true,
          //       }
          //     : undefined;

          const articleUrl =
            DOMAIN.PROTOCOL.PRODUCTION +
            DOMAIN.APP.PRODUCTION +
            "/r/" +
            getState().article?.slug;
          const pictureSaveToPinterest =
            authorProfileID !== "not-listed"
              ? {
                  to: `http://pinterest.com/pin/create/button/?url=${encodeURIComponent(
                    articleUrl
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
                      action: "picture.modal.pinterest",
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
                  buttons: [
                    authorLinkButton,
                    pictureSaveToPinterest,
                    (() => {
                      const article = getState().article;
                      const user = getState().user;
                      const isFavourite =
                        getState().favourites[article.id]?.user;
                      if (isFavourite || !article || !user) return;
                      return {
                        to: "#",
                        onClick: event => {
                          event.preventDefault();
                          event.stopPropagation();

                          if (user.status !== "ok") {
                            ga("event", {
                              category: "auth",
                              action: "picture.modal.fav.signin",
                              label: `/r/${article.slug}`,
                            });
                            dispatch(
                              addSessionInfo({
                                loginAction: `/r/${article.slug}`,
                              })
                            );
                            Router.router.push("/account");
                            return;
                          }

                          ga("event", {
                            category: "auth",
                            action: "picture.modal.fav",
                            label: `/r/${article.slug}`,
                          });
                          dispatch(
                            addFavourite({
                              id: article.id,
                              slug: article.slug,
                            })
                          );
                          dispatch(
                            setModal(
                              {
                                status: "ok",
                                info: {
                                  noStar: true,
                                  title: (
                                    <>
                                      <Bookmark
                                        style={{
                                          height: ".9em",
                                        }}
                                      />{" "}
                                      Bookmarked
                                    </>
                                  ),
                                  text: (
                                    <>
                                      Success! “<strong>{article.title}</strong>
                                      ” has just been added to your bookmarks.
                                    </>
                                  ),
                                  buttons: [
                                    {
                                      to: "/account/bookmarks",
                                      text: "See All Bookmarks",
                                      onClick: event => {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        dispatch(setModal(bookmarksModal));
                                      },
                                    },
                                  ],
                                },
                              },
                              {
                                url: "help/bookmarks",
                              }
                            )
                          );
                        },
                        text: (
                          <>
                            <Bookmark
                              style={{
                                height: ".9em",
                              }}
                            />
                            + Bookmark
                          </>
                        ),
                      };
                    })(),
                  ],
                  headless: true,
                  ad: true,
                },

                status: response.status,
                id,
              },
              {
                url: "help/image-author",
              }
            )
          );
        } else {
          dispatch(
            setModal(errorModal, {
              url: "help/image-author",
            })
          );
        }
      })
      .catch(() => {
        return dispatch(
          setModal(errorModal, {
            url: "help/image-author",
          })
        );
      });
  };
};
