import ls from "../../utils/storage/ls";
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

export const fetchBookmarks = (request, appendItems) => {
  return dispatch => {
    if (!appendItems) dispatch(initBookmarksResults());

    request.headers = {
      Authorization: "JWT " + ls.getItem("token"),
    };

    puppy(request)
      .then(r => r.json())
      .then(response => {
        console.log(response);
        dispatch(addBookmarksResults(response));
      })
      .catch(() => {
        dispatch(addBookmarksResults({}));
      });
  };
};
