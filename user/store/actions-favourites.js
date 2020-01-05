import lscache from "lscache";

import { API } from "../../constants/router/defaults";
import { clearDomainString } from "../../utils/storage/ls-cache";
import { fetchListPage } from "../../core/store/actions-list";
import puppy from "../../utils/puppy";

export const resetFavouritesCache = dispatch => {
  const lscacheId = clearDomainString(API.FAVOURITES).replace(/[-/.:]/g, "");
  const listPagesSeen = lscache.get(`${lscacheId}-pages`);
  for (let page = 1; page < listPagesSeen + 1; page++) {
    lscache.remove(lscacheId + page);
  }

  // reload favourites list ahead of time
  dispatch(
    fetchListPage({
      params: { page: 1 },
      headers: { Authorization: "JWT " + localStorage.getItem("token") },
      url: API.FAVOURITES,
    })
  );
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
        resetFavouritesCache(dispatch);
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
        resetFavouritesCache(dispatch);
      });
  };
};
