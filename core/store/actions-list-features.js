import { API } from "../../constants/router/defaults";
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

export const fetchListFeatures = request => {
  const requestFeatured = {
    ...request,
    params: {
      ...request.params,
      featured: 1,
    },
  };
  return async dispatch => {
    if (!requestFeatured.url.includes(API.LIST)) return;

    await puppy(requestFeatured)
      .then(r => r.json())
      .then(async response => {
        const payload = {
          ...response,
          requested: requestFeatured,
          filter: response.filter || {
            tags: [],
          },
        };

        dispatch(setListFeaturesPage(payload));
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
