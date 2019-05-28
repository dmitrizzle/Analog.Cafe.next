import { PLACEHOLDER } from "../components/pages/List/constants";

export const listInitialState = {
  status: "loading",
  filter: {
    tags: [],
    author: {}
  },
  page: {
    current: "1",
    total: "1"
  },
  items: PLACEHOLDER,
  requested: {
    method: "get",
    params: {},
    url: ""
  }
};

export default (state = listInitialState, action) => {
  switch (action.type) {
    case "LIST.SET_PAGE":
      return {
        ...state,
        requested: listInitialState.requested,
        ...action.payload
      };
    case "LIST.ADD_PAGE":
      return {
        ...state,
        ...action.payload,
        items: [...state.items, ...action.payload.items]
      };
    case "LIST.INIT_PAGE":
      return {
        ...listInitialState,
        ...action.payload
      };
    case "LIST.SET_AUTHOR":
      return {
        ...state,
        author: action.payload
      };
  }
  return state;
};
