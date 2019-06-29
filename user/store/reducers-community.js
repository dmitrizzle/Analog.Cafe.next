let authorsListDefaults = [];
for (let o = 0; o < 10; o++) {
  authorsListDefaults[o] = { id: o };
}

export const communityInitialState = {
  authorsList: {
    status: "loading",
    items: authorsListDefaults,
  },
};

export default (state = communityInitialState, action) => {
  switch (action.type) {
    case "AUTHORS.SET_PAGE":
      return {
        ...state,
        authorsList: action.payload,
      };
    case "AUTHORS.ADD_PAGE":
      return {
        ...state,
        ...action.payload,
        items: [...state.items, ...action.payload.items],
      };
  }
  return state;
};
