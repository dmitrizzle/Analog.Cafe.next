import { API } from "../../constants/router/defaults";
import { responseCache } from "../../utils/storage/ls-cache";
import puppy from "../../utils/puppy";

export const initListFeaturesPage = state => {
  return {
    type: "LIST_FEATURES.INIT_PAGE",
    payload: state,
  };
};

export const setListFeaturesPage = page => {
  const type = `LIST_FEATURES.SET_PAGE`;
  return {
    type,
    payload: page,
  };
};

export const requestFeatured = request => {
  return {
    ...request,
    params: {
      ...request.params,
      featured: 1,
      "items-per-page": 12,
    },
  };
};
export const fetchListFeatures = r => {
  const request = requestFeatured(r);
  return async dispatch => {
    if (!request.url.includes(API.LIST)) return;

    const action = response => {
      const payload = {
        ...response,
        requested: request,
        filter: response.filter || {
          tags: [],
        },
      };

      dispatch(initListFeaturesPage());
      dispatch(setListFeaturesPage(payload));
    };

    const cache = responseCache.get(request);
    if (typeof window !== "undefined" && cache) {
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
          initListFeaturesPage({
            status: "error",
          })
        );
      });
  };
};
