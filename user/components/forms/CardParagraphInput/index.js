import Textarea from "react-textarea-autosize";
import styled from "styled-components";

import { paragraph } from "../../../../constants/styles/typography";

export default styled(Textarea)`
  ${paragraph}
  font-size: .8em;
  width: calc(100% - 0.9em);
  margin-bottom: -0.75em;
  min-height: 4em;
  background: ${({ theme }) => theme.grey_light};
  border: none;
  padding: 0.5em !important;
  font-style: italic;
`;
