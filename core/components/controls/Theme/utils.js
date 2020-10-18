import lscache from "lscache";

import { themeInitialState } from "../../../store/reducers-theme";

export const autoTheme = () => {
  if (!process.browser) return themeInitialState;

  const browserTheme =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  return browserTheme || themeInitialState;
};

export const interpretTheme = theme => {
  if (theme === "auto") return autoTheme();
  return theme;
};
