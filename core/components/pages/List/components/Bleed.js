import styled from "styled-components";

export default styled.div`
  width: 100%;
  clear: both;
  position: relative;

  margin-bottom: 1.5em;
  margin-top: ${({ listSubmissions }) => (listSubmissions ? 0 : 3)}em;
`;
