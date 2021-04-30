import styled from "styled-components";

import { m_column } from "../../../../../constants/styles/measurements";

const AffiliateNoteWrapper = styled.aside`
  border-bottom: 1px solid;
  margin: 0 auto 0.5em;
  max-width: ${m_column};
  padding: 0.7em 1.5em 0.75em;
  > span {
    display: block;
    font-size: 0.65em;
    line-height: 1.5em;
  }
`;
const NoteTextBlock = styled.span`
  display: inline-block;
`;

const AffiliateNote = () => (
  <AffiliateNoteWrapper>
    <span>
      ✪{" "}
      <em>
        <strong>Note:</strong>{" "}
        <span>
          This read contains affiliate links. Your clicks and purchases support
          this website. <NoteTextBlock>Thank you!</NoteTextBlock>
        </span>
      </em>
    </span>
  </AffiliateNoteWrapper>
);

export default AffiliateNote;
