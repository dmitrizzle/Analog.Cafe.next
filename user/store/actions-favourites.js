import lscache from "lscache";

import { API } from "../../constants/router/defaults";
import { clearDomainString } from "../../utils/storage/ls-cache";
import { fetchBookmarks } from "../../core/store/actions-bookmarks";
import { getListMeta } from "../../core/components/pages/List/utils";
import puppy from "../../utils/puppy";

export const resetFavouritesCache = dispatch => {
  const lscacheId = clearDomainString(API.FAVOURITES).replace(/[-/.:]/g, "");
  const listPagesSeen = lscache.get(`${lscacheId}-pages`) || 1;

  for (let page = 1; page < listPagesSeen + 1; page++) {
    lscache.remove(lscacheId + page);
  }

  // reload favourites list ahead of time
  const { request } = getListMeta("/account");
  dispatch(fetchBookmarks(request));
};

export const isFavourite = article => {
  const token = lscache.get("token");

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
  const token = lscache.get("token");

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
  const token = lscache.get("token");

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
