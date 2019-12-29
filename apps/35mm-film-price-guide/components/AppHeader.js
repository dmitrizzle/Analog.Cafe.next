import styled from "styled-components";

import { c_grey_med } from "../../../constants/styles/colors";

export default styled.div`
  z-index: 11;
  position: relative;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(3px);
  border-bottom: 1px solid ${c_grey_med};
`;
