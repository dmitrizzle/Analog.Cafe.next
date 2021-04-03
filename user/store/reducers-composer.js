import { INPUT_HEADER_DEFAULTS } from "../../constants/messages/system";
import { clearComposerStorage } from "../../utils/storage/ls-user-session";
import {
  loadComposerData,
  loadHeader,
  saveComposerData,
} from "../../utils/storage/ls-composer";

export const composerInitialState = {
  focusRequested: 0,
  header: {
    title: loadHeader().title,
    subtitle: loadHeader().subtitle,
  },
  editStatus: "pending",
  data: {
    status: undefined,
    id: undefined,
    slug: undefined,
    tag: undefined,
    submittedBy: undefined,
    ...loadComposerData(),
  },
};

const reducerComposer = (state = composerInitialState, action) => {
  switch (action.type) {
    case "COMPOSER.SET_HEADER":
      return {
        ...state,
        header: action.payload,
      };
    case "COMPOSER.RESET":
      clearComposerStorage();
      return {
        ...composerInitialState,
        header: INPUT_HEADER_DEFAULTS,
      };
    case "COMPOSER.SET_EDIT_STATUS":
      return {
        ...state,
        editStatus: action.payload,
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
export default reducerComposer;
