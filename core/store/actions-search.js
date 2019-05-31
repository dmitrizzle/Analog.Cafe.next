import { GOOGLE_SEARCH_API } from "../../constants/authentication";
import puppy from "../../utils/puppy";

export const setSearchResults = (data, appendItems = false) => {
  if (appendItems === false)
    return {
      type: "SEARCH.SET_RESULTS",
      payload: data,
    };
  else
    return {
      type: "SEARCH.ADD_RESULTS",
      payload: data,
    };
};
export const setSearchStatus = isFetching => {
  return {
    type: "SERCH.SET_STATUS",
    payload: isFetching,
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

    puppy({ url, params: { key, cx, q } })
      .then(r => {
        status = r.status;
        return r.json();
      })
      .then(response => {
        dispatch(setSearchStatus(false));
        if (status === 200) dispatch(setSearchResults(response, false));
      })
      .catch(() => {
        dispatch(setSearchStatus(false));
      });
  };
};
