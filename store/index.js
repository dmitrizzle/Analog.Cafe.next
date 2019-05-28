import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

import modal, { modalInitialState } from "../core/store/reducers-modal";
import search, { searchInitialState } from "../core/store/reducers-search";

const combineInitialStates = {
  modal: modalInitialState,
  search: searchInitialState
};

const initializeStore = (initialState = combineInitialStates) => {
  return createStore(
    combineReducers({
      modal,
      search
    }),
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
};

export default initializeStore;
