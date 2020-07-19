export const themeInitialState = "light";
const template = theme =>
  `theme=${theme}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT";`;

export default (state = themeInitialState, action) => {
  switch (action.type) {
    case "THEME.SWITCH":
      // localStorage.setItem("theme", action.payload);
      template(action.payload);
      return action.payload;
    case "THEME.TOGGLE":
      // eslint-disable-next-line
      const theme = state === "light" ? "dark" : "light";
      document.cookie = template(theme);
      // localStorage.setItem("theme", theme);
      return theme;
  }
  return state;
};
