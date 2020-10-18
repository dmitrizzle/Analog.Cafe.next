import lscache from "lscache";

export const themeInitialState = "light";

const themeOptions = ["auto", "dark", "light"];
const themeToggler = state => {
  const toggleIndex = themeOptions.indexOf(state);
  const theme =
    themeOptions[toggleIndex === themeOptions.length - 1 ? 0 : toggleIndex + 1];
  lscache.set("theme", theme);
  return theme;
};

export default (state = themeInitialState, action) => {
  switch (action.type) {
    case "THEME.SWITCH":
      lscache.set("theme", action.payload);
      return action.payload;
    case "THEME.TOGGLE":
      return themeToggler(state);
  }
  return state;
};
