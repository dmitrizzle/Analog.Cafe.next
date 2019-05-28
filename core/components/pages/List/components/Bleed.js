import styled from "styled-components";

export default styled.div`
  width: 100%;
  clear: both;
  position: relative;
  margin-top: ${props => (props.noNegativeMargin ? "0" : "-17em")};
  ${props =>
    props.author
      ? !props.noNegativeMargin &&
        `
        @media (min-width: ${b_movie}) {
          margin-top: -17.5em
        }
      `
      : `margin-top: calc(
    -12em - 1.5em
  )`};
  margin-bottom: 1.5em;
`;
