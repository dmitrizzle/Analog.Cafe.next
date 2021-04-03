import styled from "styled-components";

import { b_tablet, m_column } from "../../../constants/styles/measurements";

export default styled.div`
  position: absolute;
  top: 6em;
  width: ${m_column};
  left: calc(50vw - (${m_column} / 2));

  backdrop-filter: blur(8px);
  padding: 0.5em;
  border-radius: 0.33em;
  background: rgba(255, 255, 255, 0.25);

  transition: all 250ms;

  @media (max-width: ${b_tablet}) {
    width: calc(100% - 3.5em);
    left: 1.5em;
  }
`;
