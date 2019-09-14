export const setComposerHeader = payload => {
  return {
    type: "COMPOSER.SET_HEADER",
    payload,
  };
};
export const resetComposer = () => {
  return {
    type: "COMPOSER.RESET",
  };
};
export const setComposerEditStatus = payload => {
  return {
    type: "COMPOSER.SET_EDIT_STATUS",
    payload,
  };
};
export const addComposerData = payload => {
  return {
    type: "COMPOSER.ADD_DATA",
    payload,
  };
};
export const resetComposerData = () => {
  return {
    type: "COMPOSER.RESET_DATA",
  };
};

export const requestComposerFocus = () => {
  return {
    type: "COMPOSER.REQUEST_FOCUS",
  };
};
