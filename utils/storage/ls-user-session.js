import lscache from "lscache";

const STORAGE_HEADER_STATE = "composer-header-state";
const STORAGE_CONTENT_STATE = "composer-content-state";
const STORAGE_COMPOSER_DATA = "composer-data";

export const getLocalSessionInfo = () => {
  if (!lscache.supported()) return null;
  return lscache.get("session-info") || {};
};

// clear header, content, and submsision id data & back-up content
export const clearComposerStorage = () => {
  if (!lscache.supported()) return;
  lscache.set(
    `backup-${STORAGE_HEADER_STATE}`,
    lscache.get(STORAGE_HEADER_STATE)
  );
  lscache.set(
    `backup-${STORAGE_CONTENT_STATE}`,
    lscache.get(STORAGE_CONTENT_STATE)
  );
  lscache.remove(STORAGE_HEADER_STATE);
  lscache.remove(STORAGE_CONTENT_STATE);
  lscache.remove(STORAGE_COMPOSER_DATA);
};
