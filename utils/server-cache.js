import lscache from "lscache";

import { DOMAIN } from "../constants/router/defaults";
import { ROUTE_TAGS } from "../core/components/pages/List/constants";
import puppy from "./puppy";

const p = process.env.NODE_ENV === "production" ? "PRODUCTION" : "DEVELOPMENT";

export const invalidate = url => {
  if (!url) return;
  // force cache clear on Next.js server
  fetch(url + "?force=true", { method: "get" }).then(() => {
    // clear CloudFlare caches
    if (process.env.NODE_ENV !== "production") return;
    if (!lscache.get("token")) return;
    puppy({
      url: `${DOMAIN.PROTOCOL[p] + DOMAIN.API[p]}/admin/cache`,
      method: "DELETE",
      headers: {
        Authorization: "JWT " + lscache.get("token"),
        "Content-Type": "application/json",
      },
      body: {
        files: [url],
      },
    });
  });
};

export const invalidateArticlePages = article => {
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
