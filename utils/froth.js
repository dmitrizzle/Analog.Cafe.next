import { froth } from "@roast-cms/image-froth";

import { DOCUMENT_BLANK_DOT } from "../core/components/vignettes/Picture/constants";

const FROTH_CONSTANTS = {
  server: "https://res.cloudinary.com/analog-cafe/image/upload/",
  transformations: "c_scale,fl_progressive",
  sizes: {
    i: "80",
    t: "280",
    s: "520",
    m: "1268",
    l: "1800",
  },
  placeholder: DOCUMENT_BLANK_DOT,
};
export const makeFroth = options => {
  // this wrapper will add ability to recognize full URLs as Froth objects
  // ...and inject global variables automatically
  const init = froth(options, FROTH_CONSTANTS);
  let src = options.src;
  let ratio = 0;
  let height = null;
  if (src && src.includes("image-froth")) {
    ratio =
      src
        .split("image-froth_")
        .pop()
        .split("_")
        .shift() / 1000000;
    height = Math.round(options.width / ratio, 1);
  }
  return { ...init, ratio, height };
};
