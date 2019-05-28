import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

import list, { listInitialState } from "../core/store/reducers-list";
import modal, { modalInitialState } from "../core/store/reducers-modal";
import search, { searchInitialState } from "../core/store/reducers-search";

const combineInitialStates = {
  modal: modalInitialState,
  search: searchInitialState,
  list: listInitialState
};

const initializeStore = (initialState = combineInitialStates) => {
  return createStore(
    combineReducers({
      modal,
      search,
      list
    }),
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
};

export default initializeStore;
