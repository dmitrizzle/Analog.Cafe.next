export const modalInitialState = {
  hidden: true,
  status: "initializing",
  info: {
    title: "Grabbing Card…",
    text: "",
    buttons: {},
  },
  requested: {
    method: "get",
    params: {},
    url: "",
  },
};

const reducerModal = (state = modalInitialState, action) => {
  switch (action.type) {
    case "MODAL.SET_CARD":
      return {
        ...state,
        ...action.payload,
      };
    case "MODAL.INIT_CARD":
      return {
        ...modalInitialState,
        status: "loading",
        ...action.payload,
      };
    case "MODAL.HIDE_CARD":
      return {
        ...state,
        hidden: true,
        requested: state.requested,
      };
  }
  return state;
};
export default reducerModal;
