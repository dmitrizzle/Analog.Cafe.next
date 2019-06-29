import { INPUT_HEADER_DEFAULTS } from "../constants/slate-document-rules";
import { clearLocalStorage, loadHeader } from "../../utils/storage";

export const composerInitialState = {
  status: "",
  focusRequested: 0,
  header: {
    title: loadHeader().title,
    subtitle: loadHeader().subtitle,
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
        ...state,
        header: INPUT_HEADER_DEFAULTS,
      };
    case "COMPOSER.SET_STATUS":
      return {
        ...state,
        status: action.payload,
      };
    case "COMPOSER.REQUEST_FOCUS":
      return {
        ...state,
        focusRequested: state.focusRequested + 1,
      };
  }
  return state;
};
