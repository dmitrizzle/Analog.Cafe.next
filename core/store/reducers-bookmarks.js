import { listInitialState } from "./reducers-list";

export default (
  state = {
    ...listInitialState,
    items: [],
  },
  action
) => {
  switch (action.type) {
    case "BOOKMARKS.ADD_RESULTS":
      return {
        ...action.payload,
        items: [
          ...state.items,
          ...(action.payload.items ? action.payload.items : []),
        ],
      };
    case "BOOKMARKS.INIT_RESULTS":
      return {
        ...listInitialState,
        items: [],
      };
    case "BOOKMARKS.SET_STATUS":
      return {
        ...state,
        status: action.payload,
      };
  }
  return state;
};
