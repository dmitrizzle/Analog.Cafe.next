import { saveSubmissionId } from "../../utils/storage";

export const setComposerHeader = value => {
  return {
    type: "COMPOSER.SET_HEADER",
    payload: value,
  };
};
export const resetComposer = () => {
  return {
    type: "COMPOSER.RESET",
  };
};
export const setComposerSatus = status => {
  return {
    type: "COMPOSER.SET_STATUS",
    payload: status,
  };
};
export const setSubmissionId = id => {
  return {
    type: "COMPOSER.SET_SUBMISSION_ID",
    payload: id,
  };
};

export const requestComposerFocus = () => {
  return {
    type: "COMPOSER.REQUEST_FOCUS",
  };
};
