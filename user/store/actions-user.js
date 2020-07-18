import { API, DOMAIN } from "../../constants/router/defaults";
import { CARD_ALERTS } from "../../constants/messages/system";
import { CARD_ERRORS } from "../../constants/messages/errors";
import { anonymizeEmail } from "../../utils/email";
import { invalidate } from "../../utils/server-cache";
import { setModal } from "../../core/store/actions-modal";
import ls from "../../utils/storage/ls";
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

export const rejectUserInfo = () => {
  return {
    type: "USER.SET_STATUS",
    payload: "forbidden",
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
      .catch(() => {
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
    if (!process.browser) return;
    ls.removeItem("token");
    dispatch({
      type: "USER.RESET_STATE",
      payload: null,
    });
  };
};

export const getUserInfo = thisToken => {
  return async dispatch => {
    const token = ls.getItem("token") || thisToken;

    if (!token) return dispatch(rejectUserInfo());

    let request = {
      headers: {
        Authorization: "JWT " + token,
      },
      url: API.AUTH.USER,
    };

    dispatch({
      type: "USER.SET_STATUS",
      payload: "fetching",
    });

    await puppy(request)
      .then(r => r.json())
      .then(response => {
        if (response.message === "JsonWebTokenError") {
          dispatch(
            setModal(loginErrorModal(), {
              url: "errors/user",
            })
          );
          dispatch(rejectUserInfo());
          ls.removeItem("token");
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
        ls.removeItem("token"); // clean up broken/old token
        // register in Redux store
        dispatch(rejectUserInfo());
        if (!error.response) return;
        dispatch(
          setModal(loginErrorModal(error.response.message), {
            url: "errors/user",
          })
        );
      });
  };
};

export const setUserInfo = (request, next) => {
  return async dispatch => {
    await puppy(request)
      .then(r => r.json())
      .then(response => {
        dispatch({
          type: "USER.SET_INFO",
          payload: response.info,
        });
        dispatch({
          type: "USER.SET_STATUS",
          payload: "updated",
        });

        // clear server cache
        const p =
          process.env.NODE_ENV === "production" ? "PRODUCTION" : "DEVELOPMENT";
        const base = DOMAIN.PROTOCOL[p] + DOMAIN.APP[p];
        invalidate(base + "/u/" + response.info.id);

        if (next) next();
      })
      .catch(error => {
        dispatch(
          setModal(loginErrorModal(error.message), {
            url: "errors/user",
          })
        );
        dispatch(rejectUserInfo());
      });
  };
};
