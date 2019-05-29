import styled, { css } from "styled-components";

import Sidenote from "../../../vignettes/Sidenote";

export const styles = css`
  text-align: left;
  padding: 1em 1.5em;
  font-size: 1em !important;
  line-height: 1.5em;
`;

const CardCaption = styled(Sidenote)`
  ${styles};
`;

export const CardCaptionIntegrated = styled(CardCaption)`
  font-size: 0.8em !important;
`;

export default CardCaption;
