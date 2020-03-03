import { NAV_CONFIG } from "./constants";
import { NAV_MIN_MAP } from "../../../../constants/router/breadcrumbs";

export const mapPathnameToNavConfig = (pathname, status) => {
  const isMinimalNavigation =
    NAV_MIN_MAP[
      Object.keys(NAV_MIN_MAP).filter(key => pathname.indexOf(key) !== -1)[0]
    ];

  const has = string => pathname.indexOf(string) !== -1;

  if (pathname === "/") return NAV_CONFIG.LIST;

  if (has("/write/upload")) return NAV_CONFIG.HIDDEN;

  if (has("/account/all-submissions")) return NAV_CONFIG.LIST;
  if (has("/account/bookmarks")) return NAV_CONFIG.LIST;
  if (has("/account/submission")) return NAV_CONFIG.DEFAULT;

  if (has("/account"))
    return status === "ok" ? NAV_CONFIG.DEFAULT : NAV_CONFIG.MINIMAL;

  return isMinimalNavigation ? NAV_CONFIG.MINIMAL : NAV_CONFIG.DEFAULT;
};
