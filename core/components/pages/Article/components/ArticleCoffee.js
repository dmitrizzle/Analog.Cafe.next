import React from "react";

import { CoffeeInline } from "../../../icons/Coffee";
import { getFirstNameFromFull } from "../../../../../utils/author-credits";
import Link from "../../../controls/Link";

// NOTE: styles are in ArticleWrapper
// that's because hosting them here causes discrepancies between server and client views
export default ({ name, link }) => {
  return (
    <Link to={link || "#"} className="article-coffee-header">
      <div>
        <u>Thank</u> {getFirstNameFromFull(name || "")} with a “coffee”
        <CoffeeInline />
      </div>
    </Link>
  );
};
