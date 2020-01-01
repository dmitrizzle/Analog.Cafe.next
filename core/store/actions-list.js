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

    // if (request.params && request.params.collection) {
    //   dispatch(initListPage());
    // }
    // if (listState.requested.params.author !== request.params.author) {
    //   dispatch(initListPage());
    // }

    const action = async response => {
      const listAuthor =
        (response &&
          response.filter &&
          response.filter.author &&
          response.filter.author.id) ||
        null;

      const payload = {
        ...response,
        requested: request,
        filter: response.filter || {
          tags: [],
          author: {},
        },
      };

      if (
        isAccountRequired(request.url) !==
        isAccountRequired(listState.requested.url)
      ) {
        dispatch(initListPage());
      }

      const user = getState().user;

      if (
        (user && user.status === "ok" && user.info.id === listAuthor) ||
        (user && user.info.role === "admin" && listAuthor)
      ) {
        await dispatch(fetchListAuthor(listAuthor, payload, appendItems));
        return;
      }

      if (listAuthor) {
        await dispatch(fetchListAuthor(listAuthor, payload, appendItems));
        return;
      }

      if (isAccountRequired(request.url)) {
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
      return action(cache);
    }

    await puppy(request)
      .then(r => r.json())
      .then(response => {
        responseCache.set(request, response);
        return action(response);
      })
      .catch(() => dispatch(initListPage({ status: "error" })));
  };
};
