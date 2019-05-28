import { GOOGLE_SEARCH_API as API } from "../../constants/routes";
import { GOOGLE_SEARCH_API } from "../../constants/authentication";

export const setSearchResults = (data, appendItems = false) => {
  if (appendItems === false)
    return {
      type: "SEARCH.SET_RESULTS",
      payload: data
    };
  else
    return {
      type: "SEARCH.ADD_RESULTS",
      payload: data
    };
};
export const setSearchStatus = isFetching => {
  return {
    type: "SERCH.SET_STATUS",
    payload: isFetching
  };
};

export const getSearchResults = q => {
  let request;
  const { key, cx } = GOOGLE_SEARCH_API;
  request = {
    url: API.PRODUCTION,
    params: {
      key,
      cx,
      q
    }
  };
  return dispatch => {
    if (q === "") {
      dispatch(setSearchStatus(false));
    }
    dispatch(setSearchStatus(true));
    // axios(makeAPIRequest(request))
    //   .then(response => {
    //     dispatch(setSearchStatus(false))
    //     if (response.status === 200) {
    //       dispatch(setSearchResults(response.data, false))
    //     }
    //   })
    //   .catch(() => {
    //     dispatch(setSearchStatus(false))
    //   })
  };
};
