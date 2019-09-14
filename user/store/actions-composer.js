import { saveComposerData } from "../../utils/storage";

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
export const setComposerSubmissionId = id => {
  return {
    type: "COMPOSER.SET_SUBMISSION_ID",
    payload: id,
  };
};

export const setComposerSubmissionTag = tag => {
  return {
    type: "COMPOSER.SET_TAG",
    payload: tag,
  };
};
export const setComposerSubmissionAuthor = submittedBy => {
  return {
    type: "COMPOSER.SET_AUTHOR",
    payload: submittedBy,
  };
};

export const requestComposerFocus = () => {
  return {
    type: "COMPOSER.REQUEST_FOCUS",
  };
};
