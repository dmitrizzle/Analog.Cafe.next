import { froth } from "@roast-cms/image-froth";

import { BLANK_DOT_URI } from "../constants/styles/global";
import { CLOUDINARY_BASE, CLOUDINARY_TRANSFORM } from "../constants/cloudinary";

const FROTH_CONSTANTS = {
  server: CLOUDINARY_BASE,
  transformations: CLOUDINARY_TRANSFORM(),
  sizes: {
    i: "80",
    t: "280",
    s: "520",
    m: "1268",
    l: "1800",
  },
  placeholder: BLANK_DOT_URI,
};
export const makeFroth = options => {
  // this wrapper will add ability to recognize full URLs as Froth objects
  // ...and inject global variables automatically
  const init = froth(options, FROTH_CONSTANTS);
  let src = options.src;
  let ratio = 0;
  let height = null;
  if (src && src.includes("image-froth")) {
    ratio = src.split("image-froth_").pop().split("_").shift() / 1000000;
    height = Math.round(options.width / ratio, 1);
  }
  return { ...init, ratio, height };
};
