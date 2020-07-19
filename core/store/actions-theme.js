export const switchTheme = theme => {
  return { type: "THEME.SWITCH", payload: theme };
};

export const toggleTheme = () => {
  return { type: "THEME.TOGGLE" };
};
