import { API } from "../../constants/router/defaults";
import { HEADER_ERRORS } from "../../constants/messages/errors";
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
  return async dispatch => {
    if (
      !request.url.includes(API.SUBMISSIONS) &&
      !request.url.includes(API.ARTICLES)
    )
      return;

    dispatch(initArticlePage());

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

    await puppy(request)
      .then(r => r.json())
      .then(response => {
        response.content && response.content.raw
          ? dispatch(setArticlePage(response))
          : dispatch(
              initArticlePage({
                error: "Article not found",
              })
            );
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

// export const updateArticleStatus = request => {
//   return dispatch => {
//     const token = localStorage.getItem("token")
//     if (token)
//       request.headers = {
//         Authorization: "JWT " + token
//       }
//     axios(makeAPIRequest(request))
//       .then(response => {
//         response.data.status
//           ? dispatch({
//               type: "ARTICLE.SET_STATUS",
//               payload: response.data.status
//             })
//           : console.log("Failed updating article status")
//       })
//       .catch(error => {
//         console.log(error)
//       })
//   }
// }
