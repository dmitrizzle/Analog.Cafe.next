import { API } from "../../constants/router/defaults";
import { CARD_ALERTS } from "../../constants/messages/system";
import { CARD_ERRORS } from "../../constants/messages/errors";
import { anonymizeEmail } from "../../utils/email";
import { setModal } from "../../core/store/actions-modal";
import puppy from "../../utils/puppy";

const loginErrorModal = (reason = "error") => {
  return {
    status: "ok",
    info: {
      ...CARD_ERRORS.SIGNED_OUT(reason),
      text:
        "Your security credentials are invalid. Please try logging in again.",
    },
  };
};

export const setConnectionStatus = connection => {
  return {
    type: "USER.SET_CONNECTION_STATUS",
    payload: connection,
  };
};

export const addSessionInfo = sessionInfo => {
  return {
    type: "USER.ADD_SESSION_INFO",
    payload: sessionInfo,
  };
};
export const getSessionInfo = () => {
  return { type: "USER.GET_SESSION_INFO" };
};

export const acceptUserInfo = () => {
  return {
    type: "USER.SET_STATUS",
    payload: "ok",
  };
};

export const loginWithEmail = validatedEmail => {
  return dispatch => {
    dispatch({
      type: "USER.SET_EMAIL_LOGIN_STATUS",
      payload: "pending",
    });
    dispatch(
      addSessionInfo({
        loginMethod: "email",
        loginEmail: anonymizeEmail(validatedEmail),
      })
    );

    const request = {
      url: API.AUTH.VIA_EMAIL,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: { email: validatedEmail },
      method: "post",
    };
    puppy(request)
      .then(response => {
        if (response.status === 400) {
          dispatch(
            setModal({
              info: CARD_ERRORS.LOGIN_EMAIL_TIMEOUT,
            })
          );
          return;
        }

        dispatch(setModal(CARD_ALERTS.LOGIN_EMAIL(validatedEmail)));
        dispatch({
          type: "USER.SET_EMAIL_LOGIN_STATUS",
          payload: "ok",
        });
      })
      .catch(error => {
        dispatch(
          setModal({
            status: "ok",
            info: CARD_ERRORS.LOGIN_EMAIL,
            requested: { url: "errors/email-login" },
          })
        );
        dispatch({
          type: "USER.SET_EMAIL_LOGIN_STATUS",
          payload: "ok",
        });
      });
  };
};

export const forgetUser = () => {
  return dispatch => {
    if (typeof localStorage === "undefined") return;
    localStorage.removeItem("token");
    dispatch({
      type: "USER.RESET_STATE",
      payload: null,
    });
  };
};

export const getUserInfo = thisToken => {
  return async dispatch => {
    let lsToken;
    if (typeof localStorage !== "undefined") {
      lsToken = localStorage.getItem("token");
    }
    const token = lsToken || thisToken;
    if (!token) return;

    let request = {
      headers: {
        Authorization: "JWT " + token,
      },
      url: API.AUTH.USER,
    };
    await puppy(request)
      .then(r => r.json())
      .then(response => {
        if (response.message === "JsonWebTokenError") {
          dispatch(
            setModal(loginErrorModal(), {
              url: "errors/user",
            })
          );
          dispatch({
            type: "USER.SET_STATUS",
            payload: "forbidden",
          });
          if (typeof localStorage !== "undefined")
            localStorage.removeItem("token");
          return;
        }

        dispatch({
          type: "USER.SET_STATUS",
          payload: response.status,
        });
        dispatch({
          type: "USER.SET_INFO",
          payload: response.info,
        });
      })
      .catch(error => {
        console.log(error);
        if (typeof localStorage !== "undefined")
          localStorage.removeItem("token"); // clean up broken/old token
        // register in Redux store
        dispatch({
          type: "USER.SET_STATUS",
          payload: "forbidden",
        });
        if (!error.response) return;
        dispatch(
          setModal(loginErrorModal(error.response.message), {
            url: "errors/user",
          })
        );
      });
  };
};

// export const setUserInfo = request => {
