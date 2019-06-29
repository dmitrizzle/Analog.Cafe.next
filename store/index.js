import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

import article, { articleInitialState } from "../core/store/reducers-article";
import community, {
  communityInitialState,
} from "../user/store/reducers-community";
import composer, {
  composerInitialState,
} from "../user/store/reducers-composer";
import list, { listInitialState } from "../core/store/reducers-list";
import modal, { modalInitialState } from "../core/store/reducers-modal";
import search, { searchInitialState } from "../core/store/reducers-search";

const combineInitialStates = {
  modal: modalInitialState,
  search: searchInitialState,
  list: listInitialState,
  community: communityInitialState,
  composer: composerInitialState,
  article: articleInitialState,
};

const initializeStore = (initialState = combineInitialStates) => {
  return createStore(
    combineReducers({
      modal,
      search,
      list,
      community,
      composer,
      article,
    }),
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
};

export default initializeStore;
