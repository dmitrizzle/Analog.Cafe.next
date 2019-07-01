import { API } from "../../constants/router/defaults";
import { CARD_ALERTS } from "../../constants/messages/system";
import { CARD_ERRORS } from "../../constants/messages/errors";
import { anonymizeEmail } from "../../utils/email";
import { setModal } from "../../core/store/actions-modal";
import puppy from "../../utils/puppy";

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
      type: "USER.SET_EMAIL_LOGIN_STATUS",
      payload: "pending",
    });
    dispatch(
      addSessionInfo({
        loginMethod: "email",
        loginEmail: anonymizeEmail(validatedEmail),
      })
    );

    console.log(validatedEmail);
    const request = {
      url: API.AUTH.VIA_EMAIL,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: { email: validatedEmail },
      method: "post",
    };
    puppy(request)
      // .then(r => r.json())
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

// export const verifyUser = () => {

// export const forgetUser = () => {

// export const getUserInfo = () => {

// export const setUserInfo = request => {
