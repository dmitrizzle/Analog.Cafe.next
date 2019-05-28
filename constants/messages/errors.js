import { TEXT_EMOJIS } from "./emojis";

export const HEADER_ERRORS = {
  ARTICLE: {
    title: TEXT_EMOJIS.WTF,
    subtitle: "Page Not Available"
  },
  LIST: {
    title: "Nothing here yet",
    emoji: TEXT_EMOJIS.WTF
  },
  LIST_OFFLINE: {
    title: "You aren’t connected to the internet",
    emoji: TEXT_EMOJIS.WTF
  }
};

export const CARD_ERRORS = {
  PICTURE_AUTHOR: {
    name: "Unknown Author",
    title: "Info not available",
    text: "This image has been authored by someone not listed in our records…"
  },
  CARD: {
    title: "Info Not Available",
    text: "This card could not be loaded…"
  },
  AUTHOR: {
    text: "Author hasn’t shared any details about her- or himself yet."
  },
  LIST: {
    title: HEADER_ERRORS.ARTICLE.subtitle,
    emoji: TEXT_EMOJIS.WTF
  }
};

export const TEXT_ERRORS = {
  CODE_103: { error: "Error: User already authenticated. (103)" },
  CODE_204: { error: "Error: Malformed or no data received. (204)" },
  CODE_404: {
    error: "Error: This view or data for this view does not exist. (404)"
  },
  CODE_403: {
    error: "Error: Viewing this content requires you to sign in. (403)"
  },
  CODE_401: {
    error: "Error: You need to sign in to access your account. (401)",
    TokenExpiredError:
      "You have been automatically signed out, please sign in again. (401)",
    JsonWebTokenError:
      "You will need to sign in again should you want to submit or edit your account. (401) "
  }
};
