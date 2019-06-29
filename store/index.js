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
import user, { userInitialState } from "../user/store/reducers-user";

const combineInitialStates = {
  article: articleInitialState,
  community: communityInitialState,
  composer: composerInitialState,
  list: listInitialState,
  modal: modalInitialState,
  search: searchInitialState,
  user: userInitialState,
};

const initializeStore = (initialState = combineInitialStates) => {
  return createStore(
    combineReducers({
      article,
      community,
      composer,
      list,
      modal,
      search,
      user,
    }),
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
};

export default initializeStore;
