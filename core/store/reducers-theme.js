export const themeInitialState = "light";
export default (state = themeInitialState, action) => {
  switch (action.type) {
    case "THEME.SWITCH":
      localStorage.setItem("theme", action.payload);
      return action.payload;
    case "THEME.TOGGLE":
      // eslint-disable-next-line
      const theme = state === "light" ? "dark" : "light";
      localStorage.setItem("theme", theme);
      return theme;
  }
  return state;
};
