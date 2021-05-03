import { TEXT_EMOJIS } from "../../constants/messages/emojis";

const loadingDecoration = "Please wait…";

const createPlainDocument = text => {
  return {
    raw: {
      document: {
        nodes: [
          {
            object: "block",
            type: "paragraph",
            nodes: [
              {
                object: "text",
                leaves: [
                  {
                    text: text,
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  };
};

export const DOCUMENT_PLACEHOLDER = createPlainDocument(loadingDecoration);

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

const reducerArticle = (state = articleInitialState, action) => {
  switch (action.type) {
    case "ARTICLE.SET_PAGE":
      return {
        ...state,
        affiliate: action.payload.affiliate || { active: false },
        ...action.payload,
      };
    case "ARTICLE.INIT_PAGE":
      return {
        ...articleInitialState,
        status: "loading",
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
export default reducerArticle;
