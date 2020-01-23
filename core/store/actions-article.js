import { API } from "../../constants/router/defaults";
import { HEADER_ERRORS } from "../../constants/messages/errors";
import { responseCache } from "../../utils/storage/ls-cache";
import puppy from "../../utils/puppy";

export const setArticlePage = page => {
  return {
    type: "ARTICLE.SET_PAGE",
    payload: page,
  };
};
export const initArticlePage = state => {
  return {
    type: "ARTICLE.INIT_PAGE",
    payload: state,
  };
};

export const fetchArticlePage = (request, token) => {
  return async (dispatch, getState) => {
    if (
      !request.url.includes(API.SUBMISSIONS) &&
      !request.url.includes(API.ARTICLES)
    )
      return;

    dispatch({
      type: "ARTICLE.SET_STATUS",
      payload: "loading",
    });

    if (token)
      request.headers = {
        Authorization: "JWT " + token,
      };

    // dispatch error if unauthorised access requested to submission
    if (!token && request.url.includes(API.SUBMISSIONS))
      return dispatch(
        initArticlePage({
          error: "Article not found",
        })
      );

    const action = response => {
      response.content && response.content.raw
        ? dispatch(setArticlePage(response))
        : dispatch(
            initArticlePage({
              error: "Article not found",
            })
          );
    };

    const cache = responseCache.get(request);
    if (process.browser && !request.url.includes(API.SUBMISSIONS) && cache) {
      return action(cache);
    }

    await puppy(request)
      .then(r => r.json())
      .then(response => {
        action(response);
        response.content?.raw && responseCache.set(request, response);
      })
      .catch(error => {
        dispatch(
          initArticlePage({
            title: HEADER_ERRORS.ARTICLE.title,
            subtitle: HEADER_ERRORS.ARTICLE.subtitle,
            error,
          })
        );
      });
  };
};
