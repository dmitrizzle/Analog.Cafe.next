export const sublistsInitialState = {
  submissions: {
    status: "initializing",
    filter: {},
    items: [
      {
        type: "placeholder",
        title: "Loading…",
        subtitle: "",
        id: "",
      },
    ],
  },
};

const reducerSublists = (state = sublistsInitialState, action) => {
  switch (action.type) {
    case "SUBLISTS.MODIFY":
      return {
        ...state,
        ...action.payload,
      };
  }
  return state;
};
export default reducerSublists;
