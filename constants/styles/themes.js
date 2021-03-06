export const c_charcoal = `#2c2c2c`;
export const c_white = `#ffffff`;
export const c_blue = `#03a9f4`;
export const c_green = `#03bd02`;
export const c_green_highlighter = `rgba(3, 189, 2, .25)`;
export const c_red = `#ed236e`;
export const c_yellow = `#fff200`;
export const c_overlay = `rgba(25,25,25,.85)`;

export const dark = {
  __type: "dark",
  //
  fg: `#bbbbbb`,
  heading: c_white,
  fg_overlay: c_overlay,
  bg: `#232323`,
  bg_a0: `rgba(44, 44, 44, 0)`,
  brand: c_red,
  blue: c_blue,
  green: c_green,
  highlight: `#000000`,
  //
  grey_light: `#2b2b2b`,
  grey_med: `#3c3c3c`,
  grey_dark: `#f7f7f7`,
  //
  error: `#771238`,
  warning: `#7a652a`,
};
export const light = {
  __type: "light",
  //
  fg: c_charcoal,
  heading: c_charcoal,
  fg_overlay: c_overlay,
  bg: c_white,
  bg_a0: `rgba(255, 255, 255, 0)`,
  brand: c_red,
  blue: c_blue,
  green: c_green,
  highlight: c_yellow,
  //
  grey_light: `#f7f7f7`,
  grey_med: `#dfdfdf`,
  grey_dark: `#999999`,
  //
  error: `#ffaaca`,
  warning: `#fffcc5`,
};
export const themeOptions = { light, dark };
