import lscache from "lscache";

export const themeInitialState = "light";
export default (state = themeInitialState, action) => {
  switch (action.type) {
    case "THEME.SWITCH":
      lscache.set("theme", action.payload);
      return action.payload;
    case "THEME.TOGGLE":
      // eslint-disable-next-line
      const theme = state === "light" ? "dark" : "light";
      lscache.set("theme", action.payload);
      return theme;
  }
  return state;
};
