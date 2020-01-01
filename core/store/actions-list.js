import { API } from "../../constants/router/defaults";
import { responseCache } from "../../utils/storage/ls-cache";
import puppy from "../../utils/puppy";

export const setListPage = (page, appendItems) => {
  const type = `LIST.${!appendItems ? "SET" : "ADD"}_PAGE`;
  return {
    type,
    payload: page,
  };
};

export const initListPage = state => {
  return {
    type: "LIST.INIT_PAGE",
    payload: state,
  };
};
export const setListAuthor = author => {
  return {
    type: "LIST.SET_AUTHOR",
    payload: author,
  };
};

export const isAccountRequired = url => {
  return url.includes(API.SUBMISSIONS) || url.includes(API.FAVOURITES);
};

export const listAuthorPayload = (response, request) => {
  return {
    author:
      (response &&
        response.filter &&
        response.filter.author &&
        response.filter.author.id) ||
      null,
    payload: {
      ...response,
      requested: request,
      filter: response.filter || {
        tags: [],
        author: {},
      },
    },
  };
};
export const userAccessToList = (user, listAuthor) =>
  listAuthor &&
  ((user && user.status === "ok" && user.info.id === listAuthor) ||
    (user && user.info.role === "admin"));

export const fetchListPage = (request, appendItems = false) => {
  return async (dispatch, getState) => {
    const listState = getState().list;

    if (!request.url.includes(API.LIST) && !isAccountRequired(request.url))
      return;

    if (isAccountRequired(request.url))
      request.headers = {
        Authorization: "JWT " + localStorage.getItem("token"),
      };

    // draw template for submissions list
    if (request.url.includes(API.SUBMISSIONS) && !appendItems) {
      dispatch(initListPage());
    }

    const action = async response => {
      const listAuthor = listAuthorPayload(response, request).author;
      const payload = listAuthorPayload(response, request).payload;

      if (
        isAccountRequired(request.url) !==
        isAccountRequired(listState.requested.url)
      ) {
        dispatch(initListPage());
      }

      const user = getState().user;

      if (userAccessToList(user, listAuthor) || listAuthor) {
        await dispatch(fetchListAuthor(listAuthor, payload, appendItems));
        return;
      }

      if (
        isAccountRequired(request.url) &&
        // no user data required for favourites list
        !request.url.includes(API.FAVOURITES)
      ) {
        await dispatch(
          fetchListAuthor(getState().user.info.id, payload, appendItems)
        );
        return;
      }

      dispatch(setListAuthor(undefined));
      dispatch(setListPage(payload, appendItems));
    };

    const cache = responseCache.get(request);
    if (
      typeof window !== "undefined" &&
      (!isAccountRequired(request.url) ||
        // favourites are cached
        request.url.includes(API.FAVOURITES)) &&
      cache
    ) {
      return action(cache);
    }

    await puppy(request)
      .then(r => r.json())
      .then(async response => {
        action(response);
        responseCache.set(request, response);
      })
      .catch(() => {
        dispatch(
          initListPage({
            status: "error",
          })
        );
        dispatch(
          setListAuthor({
            buttons: [],
          })
        );
      });
  };
};

export const fetchListAuthor = (authorId, payload, listAppendItems) => {
  return async dispatch => {
    const request = { url: `${API.AUTHORS}/${authorId}` };

    const action = response => {
      dispatch(setListAuthor(response.info));
      dispatch(setListPage(payload, listAppendItems));
      return;
    };

    const cache = responseCache.get(request);
    if (typeof window !== "undefined" && cache) {
      action(cache);
    }

    await puppy(request)
      .then(r => r.json())
      .then(response => {
        responseCache.set(request, response);
        action(response);
      })
      .catch(() => dispatch(initListPage({ status: "error" })));
  };
};
