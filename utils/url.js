import toTitleCase from "titlecase";

export const getTitleFromSlug = (slug = "", options = {}) => {
  let title;
  options.trim = options.trim || [0, 0];
  options.titleCase =
    typeof options.titleCase === "undefined" ? true : options.titleCase;

  if (options.trim[0] === 0 && options.trim[1] === -1) {
    title = slug.substr(0, slug.lastIndexOf("-"));
  } else title = slug;
  title = typeof title === "string" ? title.replace(/-/g, " ") : "";
  if (options.titleCase) title = toTitleCase(title);
  if (options.capitalize)
    title = title.charAt(0).toUpperCase() + title.slice(1);
  return title;
};

// simplified code from https://stackoverflow.com/questions/8486099/how-do-i-parse-a-url-query-parameters-in-javascript
export const getObjectFromUrlParams = url => {
  if (!url) return;
  const query = url.substr(1);
  let result = {};
  query.split("&").forEach(part => {
    const item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
};
