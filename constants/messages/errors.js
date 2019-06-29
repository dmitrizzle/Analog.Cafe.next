import React from "react";

import { MIME_PICTURES_HUMAN } from "../../user/constants/slate-document-rules";
import { TEXT_EMOJIS } from "./emojis";

export const HEADER_ERRORS = {
  ARTICLE: {
    title: TEXT_EMOJIS.WTF,
    subtitle: "Page Not Available",
  },
  LIST: {
    title: "Nothing here yet",
    emoji: TEXT_EMOJIS.WTF,
  },
  LIST_OFFLINE: {
    title: "You aren’t connected to the internet",
    emoji: TEXT_EMOJIS.WTF,
  },
};

export const CARD_ERRORS = {
  PICTURE_AUTHOR: {
    name: "Could Not Find the Author",
    title: "Info not available",
    text: "There was an error while trying to locate this author.",
  },
  CARD: {
    title: "Info Not Available",
    text: "This card could not be loaded…",
  },
  AUTHOR: {
    text: "Author hasn’t shared any details about her- or himself yet.",
  },
  LIST: {
    title: HEADER_ERRORS.ARTICLE.subtitle,
    emoji: TEXT_EMOJIS.WTF,
  },
  ARTICLE: {
    title: HEADER_ERRORS.ARTICLE.subtitle,
    subtitle: TEXT_EMOJIS.WTF,
  },
  SEND: {
    title: "Submission Failed",
    text: "Your draft did not go through. You can try sending it again.",
  },
  SEND_IMAGES_MISSING: {
    title: "Forgot to Add Images?",
    text: "Please include at least one photograph or illustration.",
  },
  SEND_CONTENT_EMPTY: {
    title: "Please Complete Your Draft",
    // image:
    //   "https://res.cloudinary.com/analog-cafe/image/upload/v1528904759/image-froth_1010453_425a5704760c4879b31e008315c3047c.gif",
    text: (
      <span>
        One of these things is missing:
        <br />
        <br />
        <strong>✹ A title.</strong>
        <br />
        <strong>✹ 200-word article/essay.</strong>
        <br />
        <strong>✹ Image(s)</strong> <em>JPG, 10MB or less</em>.
      </span>
    ),
  },
  IMAGE_SIZE: size => {
    return {
      title: "Can’t Upload This Image",
      text: `Your image needs to be a ${MIME_PICTURES_HUMAN}, maximum ${size}MB in size. Try selecting another file.`,
    };
  },
};

export const TEXT_ERRORS = {
  CODE_103: { error: "Error: User already authenticated. (103)" },
  CODE_204: { error: "Error: Malformed or no data received. (204)" },
  CODE_404: {
    error: "Error: This view or data for this view does not exist. (404)",
  },
  CODE_403: {
    error: "Error: Viewing this content requires you to sign in. (403)",
  },
  CODE_401: {
    error: "Error: You need to sign in to access your account. (401)",
    TokenExpiredError:
      "You have been automatically signed out, please sign in again. (401)",
    JsonWebTokenError:
      "You will need to sign in again should you want to submit or edit your account. (401) ",
  },
};
