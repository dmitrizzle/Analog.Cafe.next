import { INPUT_HEADER_DEFAULTS } from "../../constants/composer";
import {
  clearLocalStorage,
  loadHeader,
  loadComposerData,
  saveComposerData,
} from "../../utils/storage";

export const composerInitialState = {
  focusRequested: 0,
  header: {
    title: loadHeader().title,
    subtitle: loadHeader().subtitle,
  },
  data: {
    status: undefined,
    id: undefined,
    slug: undefined,
    tag: undefined,
    submittedBy: undefined,
    ...loadComposerData(),
  },
};

export default (state = composerInitialState, action) => {
  switch (action.type) {
    case "COMPOSER.SET_HEADER":
      return {
        ...state,
        header: action.payload,
      };
    case "COMPOSER.RESET":
      clearLocalStorage();
      return {
        ...composerInitialState,
        header: INPUT_HEADER_DEFAULTS,
      };

    case "COMPOSER.ADD_DATA":
      saveComposerData(action.payload);
      return {
        ...state,
        data: { ...state.data, ...action.payload },
      };
    case "COMPOSER.RESET_DATA":
      saveComposerData({});
      return {
        ...state,
        data: composerInitialState.data,
      };

    case "COMPOSER.REQUEST_FOCUS":
      return {
        ...state,
        focusRequested: state.focusRequested + 1,
      };
  }
  return state;
};
