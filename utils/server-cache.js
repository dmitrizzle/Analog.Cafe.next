import { DOMAIN } from "../constants/router/defaults";
import { ROUTE_TAGS } from "../core/components/pages/List/constants";

export const invalidate = url => fetch(url + "?force=true", { method: "get" });

export const invalidateArticlePages = article => {
  const p =
    process.env.NODE_ENV === "production" ? "PRODUCTION" : "DEVELOPMENT";
  const base = DOMAIN.PROTOCOL[p] + DOMAIN.APP[p];

  // clear all lists
  Object.keys(ROUTE_TAGS).forEach(url => {
    url !== "/submissions" && invalidate(base + url);
  });

  // clear article page
  invalidate(base + "/r/" + article.slug);

  // clear author(s) page(s)
  article.authors.forEach(author => {
    invalidate(base + "/u/" + author.id);
  });
};
