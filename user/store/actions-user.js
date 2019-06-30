import { TEXT_ERRORS } from "../../constants";
import { anonymizeEmail } from "./messages-session";

const loginErrorModal = (reason = "error") => {
  return {
    status: "ok",
    info: SIGNED_OUT(reason),
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
      type: "USER.SET_EMAIL_LOGIN_TIMEOUT",
      payload: Date.now() + 61 * 1000,
    });
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
      url: ROUTE_API_LOGIN_EMAIL,
      data: { email: validatedEmail },
      method: "post",
    };
    // await puppy(request)
    //   .then(r => r.json())
    //   .then(async response => {
    //     dispatch(setModal(CARD_ALERTS.LOGIN_EMAIL(validatedEmail)))
    //     dispatch({
    //           type: "USER.SET_EMAIL_LOGIN_STATUS",
    //           payload: "ok"
    //         })
    //   })

    // axios(
    //   makeAPIRequest({
    //     url: ROUTE_API_LOGIN_EMAIL,
    //     data: { email: validatedEmail },
    //     method: "post"
    //   })
    // )
    //   .then(() => {
    //     dispatch(setModal(CARD_ALERTS.LOGIN_EMAIL(validatedEmail)))
    //     dispatch({
    //       type: "USER.SET_EMAIL_LOGIN_STATUS",
    //       payload: "ok"
    //     })
    //   })
    //   .catch(() => {
    //     dispatch(
    //       setModal({
    //         status: "ok",
    //         info: CARD_ERRORS.LOGIN_EMAIL,
    //         requested: { url: "errors/email-login" }
    //       })
    //     )
    //     dispatch({
    //       type: "USER.SET_EMAIL_LOGIN_STATUS",
    //       payload: "ok"
    //     })
    //   })
  };
};
