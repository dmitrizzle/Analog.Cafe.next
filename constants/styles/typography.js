import { css } from "styled-components";

export const titleBolder = css`
  font-weight: 600;
  @supports (font-variation-settings: normal) {
    font-variation-settings: "wght" 600;
  }
`;
export const title = css`
  font-family: "Exo 2", Arial, sans-serif;
  ${titleBolder};

  letter-spacing: 0.025em;
  line-height: 1.15em;
`;

export const paragraphNormal = css`
  font-weight: 400;
  @supports (font-variation-settings: normal) {
    font-variation-settings: "wght" 400;
  }
`;
export const paragraphBolder = css`
  font-weight: 700;
  @supports (font-variation-settings: normal) {
    font-variation-settings: "wght" 700;
  }
`;

export const paragraph = css`
  font-family: Lora, Georgia, serif;
  @supports (font-variation-settings: normal) {
    font-family: LoraVariable;
  }
  ${paragraphNormal};

  letter-spacing: 0.025em;
  line-height: 1.75em;
`;
