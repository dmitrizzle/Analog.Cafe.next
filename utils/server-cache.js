export const invalidate = url => fetch(url + "?force=true", { method: "get" });
