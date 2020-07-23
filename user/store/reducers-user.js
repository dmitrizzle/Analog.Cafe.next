import lscache from "lscache";

import { getLocalSessionInfo } from "../../utils/storage/ls-user-session";

export const userInitialState = {
  status: "pending",
  connection: {
    status: "",
  },
  info: {},
  emailLogin: {
    timeout: 0,
    status: "ok",
  },
  sessionInfo: getLocalSessionInfo(),
};

export default (state = userInitialState, action) => {
  switch (action.type) {
    case "USER.SET_CONNECTION_STATUS":
      return {
        ...state,
        connection: {
          ...state.connection,
          status: action.payload,
        },
      };
    case "USER.SET_INFO":
      return {
        ...state,
        info: action.payload,
      };
    case "USER.SET_STATUS":
      return {
        ...state,
        status: action.payload,
      };

    case "USER.SET_EMAIL_LOGIN_STATUS":
      return {
        ...state,
        emailLogin: {
          ...state.emailLogin,
          status: action.payload,
        },
      };

    case "USER.GET_SESSION_INFO":
      return {
        ...state,
        sessionInfo: getLocalSessionInfo(),
      };

    case "USER.ADD_SESSION_INFO": {
      const sessionInfo = {
        ...state.sessionInfo,
        ...action.payload,
      };
      lscache.set("session-info", sessionInfo);
      return {
        ...state,
        sessionInfo,
      };
    }

    case "USER.SET_INTENT":
      return {
        ...state,
        intent: action.payload,
      };
    case "USER.RESET_STATE":
      return userInitialState;
  }
  return state;
};
