let userListDefaults = [];
for (let o = 0; o < 10; o++) {
  userListDefaults[o] = { id: o };
}

export const communityInitialState = {
  authorsList: {
    status: "loading",
    items: userListDefaults,
  },
  memberList: {
    status: "loading",
    items: userListDefaults,
  },
};

const reducerCommunity = (state = communityInitialState, action) => {
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
    case "MEMBERS.SET_PAGE":
      return {
        ...state,
        memberList: action.payload,
      };
    case "MEMBERS.ADD_PAGE":
      return {
        ...state,
        ...action.payload,
        items: [...state.items, ...action.payload.items],
      };
  }
  return state;
};
export default reducerCommunity;
