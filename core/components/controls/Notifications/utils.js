import { rewrites } from "../../../../constants/router/transformations";

export const getContentGroupName = pathname => {
  const urlRoutedToListComponent = rewrites
    .filter(rewrite => rewrite.to === "/")
    .map(({ url }) => url);
  switch (true) {
    case pathname.match(/\/r\/*/g)?.length > 0:
      return "ARTICLE";
    case pathname === "/":
      return "HOMEPAGE";
    case urlRoutedToListComponent.indexOf(pathname) > -1:
      return "LIST";
    default:
      return "OTHER";
  }
};
