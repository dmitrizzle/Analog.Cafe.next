import styled from "styled-components";

import {
  b_mobile,
  b_movie,
  m_radius,
} from "../../../../../constants/styles/measurements";
import { styles } from "./CardButton";

export default styled.div`
  position: relative;
  display: block;
  background: ${({ theme }) => theme.bg};
  overflow: hidden;
  max-width: ${b_mobile};
  @media (min-width: ${b_movie}) {
    max-width: 380px;
  }

  border-radius: ${m_radius};

  transition: opacity 250ms;
  transform: translateZ(0);

  @media (max-width: ${b_mobile}) {
    border-radius: 0;
  }
  figure {
    margin: 0;
    img {
      width: 100%;
    }
  }
  & > button,
  & > a {
    ${styles};
  }
`;
