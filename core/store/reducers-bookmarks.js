import { listInitialState } from "./reducers-list";

export default (
  state = {
    ...listInitialState,
    items: [],
  },
  action
) => {
  console.log(action.type);
  switch (action.type) {
    case "BOOKMARKS.ADD_RESULTS":
      return {
        ...action.payload,
        items: [...state.items, ...action.payload.items],
      };
    case "BOOKMARKS.INIT_RESULTS":
      return {
        ...listInitialState,
        items: [],
      };
  }
  return state;
};
