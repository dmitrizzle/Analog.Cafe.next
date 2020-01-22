import { isAccountRequired } from "../../core/store/actions-list";
import ls from "../../utils/storage/ls";
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
        Authorization: "JWT " + ls.getItem("token"),
      };
    await puppy(request)
      .then(r => r.json())
      .then(async response => {
        await dispatch(modifySublists({ [name]: response }));
      });
  };
};
