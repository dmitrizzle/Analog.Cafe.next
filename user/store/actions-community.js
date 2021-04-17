import lscache from "lscache";

import { API } from "../../constants/router/defaults";
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
      })
      .catch(() =>
        dispatch({
          type: "AUTHORS.SET_PAGE",
          payload: {
            status: "error",
            items: [],
          },
        })
      );
  };
};

export const fetchMemberList = (options = {}, page = 1) => {
  return async dispatch => {
    const request = {
      headers: {
        Authorization: "JWT " + lscache.get("token"),
      },
      url: API.MEMBERS,
      params: {
        "items-per-page": options.itemsPerPage || undefined,
        page,
      },
    };
    await puppy(request)
      .then(r => r.json())
      .then(response => {
        dispatch({
          type: "MEMBERS.SET_PAGE",
          payload: response,
        });
      })
      .catch(() =>
        dispatch({
          type: "MEMBERS.SET_PAGE",
          payload: {
            status: "error",
            items: [],
          },
        })
      );
  };
};
