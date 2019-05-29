import styled, { css } from "styled-components";

import Sidenote from "../../../vignettes/Sidenote";

export const styles = css`
  text-align: left;
  padding: 1em 1.5em;
  line-height: 1.5em;
`;

const CardCaption = styled(Sidenote)`
  ${styles};
`;

export default CardCaption;
