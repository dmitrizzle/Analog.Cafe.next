import styled from "styled-components";

import { m_radius_sm } from "../../../../constants/styles/measurements";
import { title } from "../../../../constants/styles/typography";

export default styled.label`
  font-size: 0.65em;
  line-height: 1em;
  ${title}
  padding: .15em .5em .25em;
  border-radius: ${m_radius_sm};
  margin-left: 0.5em;

  ${props => props.pointer && `cursor:pointer;`}

  background: ${({ branded, inverse, blue, green, theme }) => {
    if (branded) return theme.brand;
    if (inverse) return theme.fg;
    if (blue) return theme.blue;
    if (green) return theme.green;
    return theme.grey_med;
  }};
  color: ${({ branded, inverse, blue, green, theme }) =>
    branded || inverse || blue || green ? theme.bg : theme.grey_dark};
`;
