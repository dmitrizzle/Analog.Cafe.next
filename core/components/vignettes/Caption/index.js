import styled, { css } from "styled-components";

export const styles = css`
  display: block;
  font-size: 0.8em !important;
  line-height: calc(0.8em * 1.8em);
  padding: 0;
`;
export default styled.div`
  ${styles} font-variant: small-caps;
  text-align: justify;
`;
