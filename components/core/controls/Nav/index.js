import React from "react";

import { NavLogoLink } from "./components/NavLinks";
import NavLogo from "./components/NavLogo";

export default props => {
  return (
    <ul>
      <li>
        <NavLogoLink href="/">
          <NavLogo red />
        </NavLogoLink>
      </li>
    </ul>
  );
};
