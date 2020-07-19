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
import favourites, {
  favouritesInitialState,
} from "../user/store/reducers-favourites";
import list, { listInitialState } from "../core/store/reducers-list";
import listFeatures from "../core/store/reducers-list-features";
import modal, { modalInitialState } from "../core/store/reducers-modal";
import search, { searchInitialState } from "../core/store/reducers-search";
import bookmarks from "../core/store/reducers-bookmarks";
import sublists, {
  sublistsInitialState,
} from "../user/store/reducers-sublists";
import theme, { themeInitialState } from "../core/store/reducers-theme";
import user, { userInitialState } from "../user/store/reducers-user";

const combineInitialStates = {
  article: articleInitialState,
  community: communityInitialState,
  composer: composerInitialState,
  favourites: favouritesInitialState,
  list: listInitialState,
  listFeatures: listInitialState,
  modal: modalInitialState,
  search: searchInitialState,
  bookmarks: {
    ...listInitialState,
    items: [],
  },
  sublists: sublistsInitialState,
  theme: themeInitialState,
  user: userInitialState,
};

const initializeStore = (initialState = combineInitialStates) =>
  createStore(
    combineReducers({
      article,
      community,
      composer,
      favourites,
      list,
      listFeatures,
      modal,
      search,
      bookmarks,
      sublists,
      theme,
      user,
    }),
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );

export default initializeStore;
