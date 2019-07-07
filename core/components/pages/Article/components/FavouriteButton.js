import React from "react";
import styled from "styled-components";

import { NavLink } from "../../../controls/Nav/components/NavLinks";
import { c_red } from "../../../../../constants/styles/colors";
import Heart from "../../../icons/Heart";
import SubNav, { SubNavItem } from "../../../controls/Nav/SubNav";

const NavArticleItem = styled(SubNavItem)`
  svg {
    height: 0.75em;
    margin: -0.25em 0 0 0;
    display: inline-block;
    path {
      ${({ isFavourite }) => isFavourite && `fill: ${c_red};`}
    }
  }
`;

export default ({ isFavourite }) => (
  <SubNav style={{ marginBottom: "-1.7em" }}>
    <NavArticleItem>
      <NavLink>
        <Heart {...isFavourite} />
      </NavLink>
    </NavArticleItem>
  </SubNav>
);
