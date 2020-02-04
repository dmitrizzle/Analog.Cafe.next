import styled from "styled-components";

export default styled.div`
  width: 100%;
  clear: both;
  position: relative;

  margin-bottom: 1.5em;
  margin-top: ${props => (props.withFeatures ? 1 : 3)}em;
`;
