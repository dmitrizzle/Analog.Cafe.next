import styled from "styled-components";

import {
  c_black,
  c_grey_dark,
  c_grey_med,
  c_red,
  c_white,
} from "../../../../constants/styles/colors";
import { m_radius_sm } from "../../../../constants/styles/measurements";
import { title } from "../../../../constants/styles/typography";

export default styled.label`
  font-size: 0.65em;
  line-height: 1em;
  ${title}
  padding: .15em .5em .25em;
  border-radius: ${m_radius_sm};
  margin-left: 0.5em;

  background: ${({ branded, inverse }) => {
    if (branded) return c_red;
    if (inverse) return c_black;
    return c_grey_med;
  }};
  color: ${({ branded, inverse }) =>
    branded || inverse ? c_white : c_grey_dark};
`;
