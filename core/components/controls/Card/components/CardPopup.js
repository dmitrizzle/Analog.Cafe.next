import styled from "styled-components";

import {
  b_mobile,
  m_radius,
} from "../../../../../constants/styles/measurements";
import {
  c_black,
  c_black_a5,
  c_white,
} from "../../../../../constants/styles/colors";
import { styles } from "./CardButton";

export default styled.div`
  position: relative;
  display: block;
  background: ${c_white};
  overflow: hidden;
  max-width: ${b_mobile};

  border-radius: ${m_radius};
  box-shadow: ${c_black_a5} 0 0.5em 2em;
  transition: opacity 250ms;
  transform: translateZ(0);

  @media (max-width: ${b_mobile}) {
    border-radius: 0;
  }
  figure {
    margin: 0;
    border-bottom: 8px solid ${c_black};
    img {
      width: 100%;
    }
  }
  & > button,
  & > a {
    ${styles};
  }
`;
