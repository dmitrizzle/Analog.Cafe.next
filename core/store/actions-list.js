import lscache from "lscache";

import { API } from "../../constants/router/defaults";
import {
  TTL_MINUTES,
  requestKey,
  responseCache,
} from "../../utils/storage/ls-cache";
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
  (user && user.status === "ok" && user.info.id === listAuthor) ||
  (user && user.info.role === "admin" && listAuthor);

export const fetchListPage = (
  request,
  appendItems = false,
  next = () => {}
) => {
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
        request.url.includes(API.FAVOURITES)) &&
      cache
    ) {
      next(); // early termination
      return action(cache);
    }

    await puppy(request)
      .then(r => r.json())
      .then(async response => {
        await action(response);

        // cache response (pages are cached separately)
        responseCache.set(request, response);

        // track all page numbers requested from list
        const requestWithoutPage = {
          ...request,
          params: {
            ...request.params,
            page: undefined,
          },
        };
        lscache.set(
          requestKey(requestWithoutPage) + "-pages",
          request.params.page,
          TTL_MINUTES
        );

        next();
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

        next();
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
      return;
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
