import styled from "styled-components";

import { c_black } from "../../../../../constants/styles/colors";
import { m_column } from "../../../../../constants/styles/measurements";

const sp = 1.5;

export default styled.header`
  text-align: center;
  margin: ${sp}em auto 0;
  max-width: ${m_column};
  border-bottom: 8px solid ${c_black};
  padding: 0 ${sp}em ${sp}em;
`;
