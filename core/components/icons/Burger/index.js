import React from "react";
import styled from "styled-components";

export const BurgerWrapper = styled.div`
  display: inline-block;
  width: 1em;
  height: 1em;
  margin: 0 0.25em -0.15em 0.25em;
  > div {
    height: 1px;
    margin: 4px 0;
    background: currentColor;
    a:active &,
    a.active & {
      background: ${({ theme }) => theme.bg} !important;
    }
  }
`;

const Index = props => <BurgerWrapper {...props}>
  <div />
  <div />
  <div />
</BurgerWrapper>;

export default Index;
