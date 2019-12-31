import { API } from "../../constants/router/defaults";
import puppy from "../../utils/puppy";
import lscache from "lscache";

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

export const fetchListFeatures = request => {
  const requestFeatured = {
    ...request,
    params: {
      ...request.params,
      featured: 1,
      "items-per-page": 12,
    },
  };
  return async dispatch => {
    if (!requestFeatured.url.includes(API.LIST)) return;

    const action = response => {
      const payload = {
        ...response,
        requested: requestFeatured,
        filter: response.filter || {
          tags: [],
        },
      };

      dispatch(initListFeaturesPage());
      dispatch(setListFeaturesPage(payload));
    };

    const cache = responseCache.get(request);
    if (typeof window !== "undefined" && cache) {
      console.log("cached");
      return action(cache);
    }

    await puppy(requestFeatured)
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
