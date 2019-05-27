import styled from "styled-components";

export default styled.a`
  ${props =>
    !props.unmarked &&
    `
    &::after{
      content: "❐";
      text-decoration: none;
      font-style: normal;
      display: inline-block;
      vertical-align: super;
      font-size: 0.5em;
      margin-right: -.25em;
      margin-left: 0em;
      margin-top: -.5em;
    }
  `};
`;
