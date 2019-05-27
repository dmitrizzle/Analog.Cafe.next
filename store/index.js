import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

const modal = (state = {}, action) => {
  return state;
};

const initializeStore = (initialState = {}) => {
  return createStore(
    combineReducers({
      modal
    }),
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
};

export default initializeStore;
