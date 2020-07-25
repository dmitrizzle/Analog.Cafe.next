import lscache from "lscache";

import { isAccountRequired } from "../../core/store/actions-list";
import puppy from "../../utils/puppy";

export const modifySublists = sublist => {
  return {
    type: "SUBLISTS.MODIFY",
    payload: sublist,
  };
};

export const getSublist = (request, name) => {
  return async dispatch => {
    if (isAccountRequired(request.url))
      request.headers = {
        Authorization: "JWT " + lscache.get("token"),
      };
    await puppy(request)
      .then(r => r.json())
      .then(async response => {
        await dispatch(modifySublists({ [name]: response }));
      });
  };
};
