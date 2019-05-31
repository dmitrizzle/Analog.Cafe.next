import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

import picture, { pictureInitialState } from "../core/store/reducers-picture";
import article, { articleInitialState } from "../core/store/reducers-article";
import community, {
  communityInitialState,
} from "../user/store/reducers-community";
import list, { listInitialState } from "../core/store/reducers-list";
import modal, { modalInitialState } from "../core/store/reducers-modal";
import search, { searchInitialState } from "../core/store/reducers-search";

const combineInitialStates = {
  modal: modalInitialState,
  search: searchInitialState,
  list: listInitialState,
  community: communityInitialState,
  article: articleInitialState,
  picture: pictureInitialState,
};

const initializeStore = (initialState = combineInitialStates) => {
  return createStore(
    combineReducers({
      modal,
      search,
      list,
      community,
      article,
      picture,
    }),
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
};

export default initializeStore;
