import { DOCUMENT_PLACEHOLDER } from "../../constants/slate-document/default-states";
import { TEXT_EMOJIS } from "../../constants/messages/emojis";

export const articleInitialState = {
  status: "initializing",
  title: TEXT_EMOJIS.HUG_RIGHT,
  subtitle: "Grabbing Article…",
  content: DOCUMENT_PLACEHOLDER,
  requested: {
    method: "get",
    params: {},
    url: "",
  },
};

export default (state = articleInitialState, action) => {
  switch (action.type) {
    case "ARTICLE.SET_PAGE":
      return {
        ...state,
        ...action.payload,
      };
    case "ARTICLE.INIT_PAGE":
      return {
        ...articleInitialState,
        ...action.payload,
      };
    case "ARTICLE.SET_STATUS":
      return {
        ...state,
        status: action.payload,
      };
  }
  return state;
};
