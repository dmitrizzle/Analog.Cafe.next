import styled from "styled-components";

import { c_black, c_grey_light } from "../../../../../constants/styles/colors";

export default styled.nav`
  @media print {
    display: none;
  }

  margin: 0;
  padding: 0 0.5em;
  position: relative;
  z-index: 20;
  margin-top: 2.75em;
  margin-bottom: ${({ tallMargin }) => (tallMargin ? "3em" : 0)};

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
