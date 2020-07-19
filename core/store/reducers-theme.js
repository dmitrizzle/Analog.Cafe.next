export const themeInitialState = "light";
export default (state = themeInitialState, action) => {
  switch (action.type) {
    case "THEME.SWITCH":
      // eslint-disable-next-line
      const theme = state === "light" ? "dark" : "light";
      if (process.browser)
        document.cookie = `theme=${theme}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
      return theme;
  }
  return state;
};
