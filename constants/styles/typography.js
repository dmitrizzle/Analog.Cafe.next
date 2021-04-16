import { css } from "styled-components";

export const variableFontWeight = weight => css`
  font-weight: ${weight};
  @supports (font-variation-settings: normal) {
    font-variation-settings: "wght" ${weight};
  }
`;

export const title = css`
  font-family: "Exo 2", Arial, sans-serif;
  @supports (font-variation-settings: normal) {
    font-family: "Exo 2variable";
  }
  ${variableFontWeight(600)};

  letter-spacing: 0.025em;
  line-height: 1.15em;
`;

export const paragraph = css`
  font-family: Lora, Georgia, serif;
  @supports (font-variation-settings: normal) {
    font-family: "LoraVariable";
  }
  ${variableFontWeight(400)};

  letter-spacing: 0.025em;
  line-height: 1.75em;
`;
