export const getLocalSessionInfo = () => {
  if (typeof localStorage === "undefined") return {};
  const local = localStorage.getItem("session-info");
  return typeof local !== "undefined" && local !== "undefined"
    ? JSON.parse(local)
    : {};
};

// clear header, content, and submsision id data & back-up content
export const clearLocalStorage = () => {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(`backup-${lsHeader}`, localStorage.getItem(lsHeader));
  localStorage.setItem(`backup-${lsContent}`, localStorage.getItem(lsContent));
  localStorage.removeItem(lsHeader);
  localStorage.removeItem(lsContent);
  localStorage.removeItem(lsComposerData);
};
