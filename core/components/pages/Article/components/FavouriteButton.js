import React from "react";
import styled from "styled-components";

import { NavLink } from "../../../controls/Nav/components/NavLinks";
import { c_red, c_yellow } from "../../../../../constants/styles/colors";
import Heart from "../../../icons/Heart";
import SubNav, { SubNavItem } from "../../../controls/Nav/SubNav";

const NavArticleItem = styled(SubNavItem)`
  a {
    svg {
      height: 0.75em;
      margin: -0.25em 0 0 0;
      display: inline-block;
      path {
        fill: ${({ isFavourite }) => (isFavourite ? c_red : "")};
      }
    }
  }
  a:active,
  a:focus {
    svg path {
      fill: ${({ isFavourite }) => (isFavourite ? c_yellow : "")};
    }
  }
`;
const NavArticle = styled(SubNav)`
  position: absolute;
  width: 100%;
  padding: 0;
`;

export default ({ isFavourite, handleFavourite }) => {
  return (
    <NavArticle>
      <NavArticleItem isFavourite={isFavourite}>
        <NavLink
          onClick={event => {
            event.preventDefault();
            event.target.blur();
            handleFavourite();
          }}
        >
          <Heart />
        </NavLink>
      </NavArticleItem>
    </NavArticle>
  );
};
