import { listInitialState } from "./reducers-list";

export default (state = listInitialState, action) => {
  switch (action.type) {
    case "LIST_FEATURES.SET_PAGE":
      return {
        ...state,
        requested: listInitialState.requested,
        ...action.payload,
      };
    case "LIST_FEATURES.INIT_PAGE":
      return {
        ...listInitialState,
        status: "loading",
        ...action.payload,
      };
  }
  return state;
};
