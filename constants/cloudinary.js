export const CLOUDINARY_BASE =
  "https://res.cloudinary.com/analog-cafe/image/upload/";
export const CLOUDINARY_TRANSFORM = (width, height) =>
  `c_fill,fl_progressive${width && height ? `,h_${height},w_${width}/` : ""}`;
