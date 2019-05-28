import styled from "styled-components";

import { b_tablet } from "../../../../../constants/styles/measurements";
import { c_black, c_grey_light } from "../../../../../constants/styles/colors";

export default styled.div`
  min-width: 33%;
  background-color: ${c_grey_light};
  background-size: cover;
  background-position: right 22%;
  margin: 0 0 0 auto;
  box-shadow: -8px 0px 0 0px ${c_black} inset;

  @media (max-width: ${b_tablet}) {
    display: none;
  }
  ul:first-child li:first-child & {
    margin-top: -${12 + 4.5}em;
  }
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
  filter: grayscale(100%);
`;
