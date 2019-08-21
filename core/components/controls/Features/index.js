import styled from "styled-components";

const Wall = styled.div`
  height: 16em;
  margin-bottom: 1.5em;
  display: flex;
  overflow: scroll;
`;
const Poster = styled.div`
  width: 10em;
  height: 16em;
  background: #eee;
  border-radius: 0.25em;
  margin-left: 1em;
  flex-shrink: 0;
  -webkit-overflow-scrolling: touch;

  &:first-child {
    margin-left: 1.5em;
  }
`;
const Spacer = styled.div`
  height: 16em;
  width: 1.5em;
  flex-shrink: 0;
`

export default () => (
  <Wall>
    <Poster />
    <Poster />
    <Poster />
    <Poster />
    <Poster />
    <Poster />
    <Poster />
    <Spacer />
  </Wall>
);
