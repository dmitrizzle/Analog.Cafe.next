import { DOMAIN } from "../constants/router/defaults";
import { ROUTE_TAGS } from "../core/components/pages/List/constants";

export const invalidate = url => fetch(url + "?force=true", { method: "get" });

export const invalidateLists = () => {
  const p =
    process.env.NODE_ENV === "production" ? "PRODUCTION" : "DEVELOPMENT";
  const base = DOMAIN.PROTOCOL[p] + DOMAIN.APP[p];

  Object.keys(ROUTE_TAGS).forEach(url => {
    url !== "/submissions" && invalidate(base + url);
  });
};
