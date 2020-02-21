import styled from "styled-components";

import {
  b_mobile,
  b_movie,
} from "../../../../../constants/styles/measurements";
import { c_yellow } from "../../../../../constants/styles/colors";

export default styled.ul`
  position: relative;
  max-width: ${b_movie};
  margin: 0 !important;

  padding: 0;
  li {
    transition: opacity 250ms;
    display: flex;
    list-style: none;
    position: relative;
    justify-content: flex-end;
    &:hover,
    &:active {
      .film-leader {
        transform: translateX(-1em);
      }
    }
    @media (min-width: ${b_mobile}) {
      label {
        padding-top: 0.05em;
      }
    }
  }
  .touch & li a:hover {
    background: ${c_yellow};
  }
`;
