import React from "react";
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

const HeaderCoffeeBanner = styled.aside`
  ${title}
  padding: 0.5em;
  color: ${c_white};
  text-align: center;
`;
const SpecialLink = styled(Link)`
  display: block;
  text-decoration: none;
  background: ${c_red};
  position: relative;
  margin: -8px 0 0;
  z-index: 11;

  @media (min-width: ${b_laptop}) {
    margin-bottom: -1em;
  }

  :active,
  :visited {
    background: ${c_black} !important;
  }
`;

export default ({ name, link }) => (
  <SpecialLink to={link || "#"}>
    <HeaderCoffeeBanner>
      If you like this read, consider <u>buying</u>{" "}
      {getFirstNameFromFull(name || "")} a “coffee” <CoffeeInline />
    </HeaderCoffeeBanner>
  </SpecialLink>
);
