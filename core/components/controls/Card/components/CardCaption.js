import styled, { css } from "styled-components";

import { styles as captionStyles } from "../../../vignettes/Caption";

export const styles = css`
  ${captionStyles};
  padding: 1em 1.5em;
  line-height: 1.5em;
`;

const CardCaption = styled.div`
  ${styles};
`;

export default CardCaption;
