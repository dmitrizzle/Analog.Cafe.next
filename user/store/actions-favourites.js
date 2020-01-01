import lscache from "lscache";

import { API } from "../../constants/router/defaults";
import { clearDomainString } from "../../utils/storage/ls-cache";
import puppy from "../../utils/puppy";

export const clearFavouritesCache = () => {
  const lscacheId = clearDomainString(API.FAVOURITES).replace(/[-/.:]/g, "");
  const listPagesSeen = lscache.get(`${lscacheId}-pages`);
  for (let page = 1; page < listPagesSeen + 1; page++) {
    lscache.remove(lscacheId + page);
  }
};

export const isFavourite = article => {
  if (typeof localStorage === "undefined") return;
  const token = localStorage.getItem("token");

  return dispatch => {
    if (!token || !article) return;
    const request = {
      url: API.FAVOURITE,
      headers: {
        Authorization: "JWT " + token,
      },
      params: {
        article,
      },
    };
    puppy(request)
      .then(r => r.json())
      .then(response => {
        dispatch({
          type: "FAVOURITES.UPDATE",
          payload: response,
        });
      });
  };
};

export const addFavourite = data => {
  if (typeof localStorage === "undefined") return;
  const token = localStorage.getItem("token");

  return dispatch => {
    if (!token) return;
    const request = {
      url: API.FAVOURITE,
      headers: {
        Authorization: "JWT " + token,
        "Content-Type": "application/json;charset=UTF-8",
      },
      method: "PUT",
      data,
    };
    puppy(request)
      .then(r => r.json())
      .then(() => {
        dispatch({
          type: "FAVOURITES.ADD",
          payload: data,
        });
        clearFavouritesCache();
      });
  };
};

export const deleteFavourite = id => {
  if (typeof localStorage === "undefined") return;
  const token = localStorage.getItem("token");

  return dispatch => {
    if (!token) return;
    const request = {
      url: API.FAVOURITE + `/${id}`,
      headers: {
        Authorization: "JWT " + token,
      },
      method: "DELETE",
    };
    puppy(request)
      .then(r => r.json())
      .then(() => {
        dispatch({
          type: "FAVOURITES.DELETE",
          payload: id,
        });
        clearFavouritesCache();
      });
  };
};
