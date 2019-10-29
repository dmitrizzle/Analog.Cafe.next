import React from "react";

import { CoffeeInline } from "../../../icons/Coffee";
import ga from "../../../../../utils/data/ga";
import { getFirstNameFromFull } from "../../../../../utils/author-credits";
import Link from "../../../controls/Link";

// NOTE: styles are in ArticleWrapper
// that's because hosting them here causes discrepancies between server and client views
export default ({ name, link }) => {
  return (
    <Link
      to={link || "#"}
      className="article-coffee-header"
      onClick={() =>
        ga("event", {
          category: "Campaign",
          action: "Article.author_cta_coffee",
          label: link || "#",
        })
      }
    >
      <div>
        <u>Thank</u> {getFirstNameFromFull(name || "")} with a “coffee”
        <CoffeeInline />
      </div>
    </Link>
  );
};
