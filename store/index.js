import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

import modal, { modalInitialState } from "../core/store/reducers-modal";

const combineInitialStates = {
  ...modalInitialState
};

const initializeStore = (initialState = combineInitialStates) => {
  return createStore(
    combineReducers({
      modal
    }),
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
};

export default initializeStore;
