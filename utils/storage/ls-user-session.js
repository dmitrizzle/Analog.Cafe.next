import ls from "./ls";

const lsHeader = "composer-header-state";
const lsContent = "composer-content-state";
const lsComposerData = "composer-data";

export const getLocalSessionInfo = () => {
  if (!process.browser) return null;
  const local = ls.getItem("session-info");
  return typeof local !== "undefined" && local !== "undefined"
    ? JSON.parse(local)
    : {};
};

// clear header, content, and submsision id data & back-up content
export const clearLocalStorage = () => {
  if (!process.browser) return;
  ls.setItem(`backup-${lsHeader}`, ls.getItem(lsHeader));
  ls.setItem(`backup-${lsContent}`, ls.getItem(lsContent));
  ls.removeItem(lsHeader);
  ls.removeItem(lsContent);
  ls.removeItem(lsComposerData);
};
