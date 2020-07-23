import lscache from "lscache";

const lsHeader = "composer-header-state";
const lsContent = "composer-content-state";
const lsComposerData = "composer-data";

export const getLocalSessionInfo = () => {
  if (!lscache.supported()) return null;
  const local = lscache.get("session-info");
  return lscache.get("session-info") || {};
};

// clear header, content, and submsision id data & back-up content
export const clearComposerStorage = () => {
  if (!lscache.supported()) return;
  lscache.set(`backup-${lsHeader}`, lscache.get(lsHeader));
  lscache.set(`backup-${lsContent}`, lscache.get(lsContent));
  lscache.remove(lsHeader);
  lscache.remove(lsContent);
  lscache.remove(lsComposerData);
};
