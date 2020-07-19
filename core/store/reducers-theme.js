export const themeInitialState = "light";
export default (state = themeInitialState, action) => {
  switch (action.type) {
    case "THEME.SWITCH":
      // eslint-disable-next-line
      const theme = state === "light" ? "dark" : "light";
      localStorage.setItem("theme", theme);
      return theme;
  }
  return state;
};
