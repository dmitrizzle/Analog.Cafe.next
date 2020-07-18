import styled from "styled-components";

import { m_column } from "../../../../../constants/styles/measurements";

export default styled.header`
  text-align: center;
  margin: 0.25em auto 0;
  max-width: ${m_column};
  border-bottom: 1px solid ${({ theme }) => theme.fg};
  padding: 0 1.5em 0.5em;
`;
