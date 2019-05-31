export const pictureInitialState = {
  default: {
    status: "loading",
    info: {
      author: {
        name: "Retrieving image author…",
        id: "",
      },
    },
  },
};

export default (state = pictureInitialState, action) => {
  switch (action.type) {
    case "PICTURE.GET_INFO":
      state = {
        ...state,
        [action.payload.id]: {
          status: action.payload.status,
          info: action.payload.info,
        },
      };
      break;
    default:
      return state;
  }
  return state;
};
