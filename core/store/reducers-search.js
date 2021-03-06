export const searchInitialState = {
  isFetching: false,
  data: {
    items: [],
    queries: {},
    searchInformation: {},
  },
};

const reducerSearch = (state = searchInitialState, action) => {
  switch (action.type) {
    case "SERCH.SET_STATUS":
      return {
        ...state,
        isFetching: action.payload,
      };
    case "SEARCH.SET_RESULTS":
      return {
        ...state,
        data: action.payload,
      };
    case "SEARCH.ADD_RESULTS":
      return {
        ...state,
        data: {
          ...state.data,
          items: [...state.data.items, ...action.payload.items],
          searchInformation: action.payload.searchInformation,
          queries: action.payload.queries,
        },
      };
    case "SEARCH.INIT_RESULTS":
      return {
        ...searchInitialState,
        ...action.payload,
      };
  }
  return state;
};
export default reducerSearch;
