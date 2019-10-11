import React, { useEffect } from "react";
import styled from "styled-components";

import { CoffeeInline } from "../../../icons/Coffee";
import { b_laptop } from "../../../../../constants/styles/measurements";
import {
  c_black,
  c_red,
  c_white,
} from "../../../../../constants/styles/colors";
import { getFirstNameFromFull } from "../../../../../utils/author-credits";
import { title } from "../../../../../constants/styles/typography";
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
