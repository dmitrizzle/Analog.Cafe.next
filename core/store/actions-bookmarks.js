import lscache from "lscache";

import puppy from "../../utils/puppy";

export const addBookmarksResults = payload => {
  return {
    type: "BOOKMARKS.ADD_RESULTS",
    payload,
  };
};
export const initBookmarksResults = () => {
  return {
    type: "BOOKMARKS.INIT_RESULTS",
  };
};
export const setBookmarksStatus = payload => {
  return {
    type: "BOOKMARKS.SET_STATUS",
    payload,
  };
};

export const fetchBookmarks = (request, appendItems) => {
  return dispatch => {
    if (!appendItems) dispatch(initBookmarksResults());
    dispatch(setBookmarksStatus("loading"));

    request.headers = {
      Authorization: "JWT " + lscache.get("token"),
    };

    puppy(request)
      .then(r => r.json())
      .then(response => {
        dispatch(addBookmarksResults(response));
      })
      .catch(() => {
        dispatch(addBookmarksResults({}));
      });
  };
};
