import styled from "styled-components";

import { c_red } from "../../../../../constants/styles/colors";
import { m_radius_sm } from "../../../../../constants/styles/measurements";
import Button from "..";

export default styled(Button)`
  font-size: 0.8em;
  padding: 0.125em 0.5em;
  z-index: 1;
  position: relative;
  width: auto;
  border-radius: ${m_radius_sm};
`;
