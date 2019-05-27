import styled from "styled-components";

import { c_black, c_grey_light } from "../../../../../constants/styles/colors";
import {
  screen_huge_min,
  screen_laptop_min,
  screen_mobile_max,
  screen_tablet_max
} from "../../../../../constants/styles/measurements";

export default styled.nav`
  @media print {
    display: none;
  }

  @media (${screen_huge_min}) {
    font-size: 23px;
  }
  @media (${screen_laptop_min}) {
    font-size: 20px;
  }
  @media (${screen_tablet_max}) {
    font-size: 18px;
  }
  @media (${screen_mobile_max}) {
    font-size: 17px;
  }

  margin: 0;
  padding: 0 0.5em;
  position: relative;
  z-index: 20;
  margin-top: 2.75em;
  margin-bottom: 2.75em;

  ul {
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    color: ${c_black};
  }

  a {
    color: inherit;
    text-decoration-skip: ink;
    text-decoration: none;
    position: relative;
    background: ${c_grey_light};
    padding: 0.1em 0.45em 0.15em;
    border-radius: 0.25em;
  }
`;
