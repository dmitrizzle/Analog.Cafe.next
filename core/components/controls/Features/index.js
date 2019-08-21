import styled from "styled-components"

const Wall = styled.div`
  height: 16em;
  margin-bottom: 1.5em;
  display: flex;
  overflow: scroll;
`
const Poster = styled.div`
  width: 10em;
  height: 16em;
  background: #eee;
  border-radius: .25em;
  margin-left: 1em;
  flex-shrink: 0;
  -webkit-overflow-scroll: touch;
`

export default props => <Wall>
  <Poster />
  <Poster />
  <Poster />
  <Poster />
  <Poster />
  <Poster />
  <Poster />
</Wall>
