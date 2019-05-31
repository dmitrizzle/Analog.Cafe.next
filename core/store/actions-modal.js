import { CARD_ERRORS, TEXT_ERRORS } from "../../constants/messages/errors";
import puppy from "../../utils/puppy";

export const initModal = state => {
  return {
    type: "MODAL.INIT_CARD",
    payload: state,
  };
};
export const hideModal = () => {
  const overlayElement = document.getElementById("modal-overlay");
  overlayElement.scrollTop = 0;
  return {
    type: "MODAL.HIDE_CARD",
    payload: {},
  };
};
export const setModal = (info, request) => {
  return dispatch => {
    dispatch(
      initModal({
        requested: request,
        hidden: false,
        status: "ok",
      })
    );
    dispatch({
      type: "MODAL.SET_CARD",
      payload: info,
    });
  };
};

export const fetchModal = request => {
  return dispatch => {
    dispatch(
      initModal({
        requested: request,
        status: "initializing",
        hidden: false,
      })
    );
    puppy(request)
      .then(r => r.json())
      .then(response => {
        if (
          response.data.info.title &&
          (response.data.info.text ||
            response.data.info.image ||
            response.data.info.role)
        ) {
          if (
            !response.data.info.text &&
            !response.data.info.image &&
            response.data.info.role
          )
            response.data.info.text = CARD_ERRORS.AUTHOR.text;
          dispatch(setModal(response.data, request));
        } else
          dispatch(
            setModal(
              {
                status: "ok",
                info: {
                  title: CARD_ERRORS.CARD.title,
                  text: CARD_ERRORS.CARD.text,
                  error: TEXT_ERRORS.CODE_204.error,
                },
              },
              { url: "errors/card" }
            )
          );
      })
      .catch(error => {
        error.response && error.response.status && error.response.status === 401
          ? dispatch(
              setModal(
                {
                  status: "ok",
                  info: {
                    title: CARD_ERRORS.CARD.title,
                    text: CARD_ERRORS.CARD.text,
                    error: TEXT_ERRORS.CODE_401.error,
                  },
                },
                { url: "errors/card" }
              )
            )
          : dispatch(
              setModal(
                {
                  status: "ok",
                  info: {
                    title: CARD_ERRORS.CARD.title,
                    text: CARD_ERRORS.CARD.text,
                    error,
                  },
                },
                { url: "errors/card" }
              )
            );
      });
  };
};
