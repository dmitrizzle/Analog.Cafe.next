import { API } from "../components/pages/List/constants";
import { CARD_ERRORS, HEADER_ERRORS } from "../../constants/messages/errors";
import puppy from "../../utils/puppy";

export const setListPage = (page, appendItems) => {
  const type = `LIST.${!appendItems ? "SET" : "ADD"}_PAGE`;
  return {
    type,
    payload: page
  };
};

export const initListPage = state => {
  return {
    type: "LIST.INIT_PAGE",
    payload: state
  };
};
export const setListAuthor = author => {
  return {
    type: "LIST.SET_AUTHOR",
    payload: author
  };
};

export const fetchListPage = (request, appendItems = false) => {
  return async (dispatch, getState) => {
    const listState = getState().list;

    const isAccountRequired = url => {
      return url.includes(API.SUBMISSIONS) || url.includes("/favourites");
    };

    if (!request.url.includes(API.LIST) && !isAccountRequired(request.url))
      return;

    if (
      listState.requested.url === request.url &&
      listState.requested.params.page === request.params.page &&
      listState.requested.params.tag === request.params.tag &&
      listState.requested.params.authorship === request.params.authorship &&
      listState.requested.params.author === request.params.author
      // &&
      //
      // listState.requested.params.authorship === request.params.authorship &&
      // listState.requested.params.author === request.params.author &&
      // listState.requested.params.page === request.params.page
    )
      return;

    if (isAccountRequired(request.url))
      request.headers = {
        Authorization: "JWT " + localStorage.getItem("token")
      };
    if (
      isAccountRequired(request.url) !==
      isAccountRequired(listState.requested.url)
    ) {
      dispatch(initListPage());
    }

    if (listState.requested.params.author !== request.params.author) {
      dispatch(initListPage());
    }

    await puppy(request)
      .then(r => r.json())
      .then(response => {
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
            author: {}
          }
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
          dispatch(fetchListAuthor(listAuthor, payload, appendItems));
          return;
        }

        if (listAuthor) {
          dispatch(fetchListAuthor(listAuthor, payload, appendItems));
          return;
        }
        if (isAccountRequired(request.url)) {
          dispatch(
            fetchListAuthor(getState().user.info.id, payload, appendItems)
          );
          return;
        }
        dispatch(setListAuthor(undefined));
        dispatch(setListPage(payload, appendItems));
      })
      .catch(() => {
        dispatch(
          initListPage({
            error: CARD_ERRORS.LIST
          })
        );
        dispatch(
          setListAuthor({
            ...HEADER_ERRORS.ARTICLE,
            buttons: []
          })
        );
      });
  };
};

export const fetchListAuthor = (authorId, payload, listAppendItems) => {
  const request = { url: `${API.AUTHORS}/${authorId}` };

  return dispatch => {
    puppy(request)
      .then(r => r.json())
      .then(response => {
        dispatch(setListAuthor(response.info));
        dispatch(setListPage(payload, listAppendItems));
      })
      .catch(() =>
        initListPage({
          error: CARD_ERRORS.LIST
        })
      );
  };
};
