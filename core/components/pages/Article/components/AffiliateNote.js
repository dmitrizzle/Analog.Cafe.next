import React from "react";
import styled from "styled-components";

import { CARD_AFFILIATE } from "../../../../../constants/messages/affiliate";
import { m_column } from "../../../../../constants/styles/measurements";
import Modal from "../../../controls/Modal";

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

const AffiliateNote = () => (
  <AffiliateNoteWrapper>
    <span>
      ✪{" "}
      <em>
        <strong>Note:</strong>{" "}
        <span>
          This read contains{" "}
          <Modal with={CARD_AFFILIATE()} unmarked>
            affiliate links
          </Modal>
          .
        </span>
      </em>
    </span>
  </AffiliateNoteWrapper>
);

export default AffiliateNote;
