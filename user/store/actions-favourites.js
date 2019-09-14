import { API } from "../../constants/router/defaults";
import puppy from "../../utils/puppy";

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
      });
  };
};
