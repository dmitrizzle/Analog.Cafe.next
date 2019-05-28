import { GOOGLE_SEARCH_API } from "../../constants/authentication";
import fetch from "../../utils/fetch";

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
  return dispatch => {
    if (q === "") {
      dispatch(setSearchStatus(false));
    }
    dispatch(setSearchStatus(true));

    const { key, cx, url } = GOOGLE_SEARCH_API;
    let status;

    fetch(url, { params: { key, cx, q } })
      .then(response => {
        status = response.status;
        return response.json();
      })
      .then(data => {
        dispatch(setSearchStatus(false));
        if (status === 200) dispatch(setSearchResults(data, false));
      })
      .catch(() => {
        dispatch(setSearchStatus(false));
      });
  };
};
