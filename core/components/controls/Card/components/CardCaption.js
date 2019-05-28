import styled, { css } from "styled-components";

import Sidenote from "../../../vignettes/Sidenote";

export const styles = css`
  text-align: left;
  padding: 1em 1.5em;
  font-size: 1.075em !important;
`;
export default styled(Sidenote)`
  ${styles};
`;
