import styled from "styled-components";

import {
  screen_laptop_max,
  screen_tablet_max
} from "../../../../../constants/styles/measurements";

export default styled.li`
  display: block;
  text-align: center;
  width: 10em;

  ${props => props.mobile && `display: none`};
  ${props => props.narrow && `display: none`};

  @media (${screen_tablet_max}) {
    ${"" /* hide non-prime items */}
    ${props => !props.prime && `display: none`};
    ${props => props.mobile && `display: block`};

    ${props => props.prime && props.center && `order: 1`};
    ${props => props.prime && props.left && `order: 0`};
    ${props => props.prime && props.right && `order: 2`};

    ${"" /* hide large display items */}
    width: 8em;
    ${props => props.wide && `display: none`};
    ${props => props.narrow && `display: inline`};
  }
`;
