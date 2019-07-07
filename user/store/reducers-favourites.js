export const favouritesInitialState = {};

export default (state = favouritesInitialState, action) => {
  switch (action.type) {
    case "FAVOURITES.ADD":
      if (!action.payload.id) return state;
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload,
          user: 1,
        },
      };
    case "FAVOURITES.DELETE":
      if (!state[action.payload]) return state;
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          user: 0,
        },
      };
    case "FAVOURITES.UPDATE":
      if (!action.payload.id) return state;
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    default:
      return state;
  }
};
