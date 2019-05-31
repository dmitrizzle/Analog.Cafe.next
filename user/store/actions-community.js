import { API } from "../../constants/routes";
import puppy from "../../utils/puppy";

export const fetchAuthorsList = (options = {}, page = 1) => {
  return async dispatch => {
    const request = {
      url: API.AUTHORS,
      params: {
        "items-per-page": options.itemsPerPage || undefined,
        page,
      },
    };
    await puppy(request)
      .then(r => r.json())
      .then(response => {
        dispatch({
          type: "AUTHORS.SET_PAGE",
          payload: response,
        });
      });
  };
};
