import styled from "styled-components";

import {
  b_phablet,
  b_tablet,
} from "../../../../../constants/styles/measurements";
import {
  c_black,
  c_black_a5,
  c_grey_light,
} from "../../../../../constants/styles/colors";

export default styled.div`
  min-width: 33%;
  background-color: ${c_grey_light};
  background-size: cover;
  background-position: right 22%;
  margin: 0 0 0 auto;
  ${"" /* box-shadow: -8px 0px 0 0px ${c_black} inset; */}

  clip-path: polygon(
    40% 0,
    73% 4%,
    100% 0,
    100% 96%,
    73% 100%,
    40% 96%,
    0 100%,
    0% 4%
  );
  ul:first-child li:first-child & {
    margin-top: -${12 + 4.5}em;
    clip-path: polygon(
      40% 0,
      73% 4%,
      100% 0,
      100% 98%,
      73% 100%,
      40% 98%,
      0 100%,
      0% 4%
    );
  }

  @media (max-width: ${b_tablet}) {
    min-width: 15%;
    background-position: right 11%;

    clip-path: polygon(
      40% 0,
      73% 0.5%,
      100% 0,
      100% 99.5%,
      73% 100%,
      40% 99.5%,
      0 100%,
      0% 0.5%
    );
    ul:first-child li:first-child & {
      margin-top: -${12 + 4.5}em;
      clip-path: polygon(
        40% 0,
        73% 0.5%,
        100% 0,
        100% 99.75%,
        73% 100%,
        40% 99.75%,
        0 100%,
        0% 0.5%
      );
    }
  }

  filter: invert(1);
  @media (max-width: ${b_phablet}) {
    min-width: 1em;
    background-position: center;
    box-shadow: none;
  }
`;
