import styled from "styled-components";

import {
  b_mobile,
  b_movie,
  m_radius,
} from "../../../../../constants/styles/measurements";
import { c_black_a5, c_white } from "../../../../../constants/styles/colors";
import { styles } from "./CardButton";

export default styled.div`
  position: relative;
  display: block;
  background: ${c_white};
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
