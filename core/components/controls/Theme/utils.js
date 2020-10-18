import { themeInitialState } from "../../../store/reducers-theme";

export const autoTheme = () => {
  if (!process.browser) return themeInitialState;

  // TODO: switch the theme in real-time as system prefs change

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
