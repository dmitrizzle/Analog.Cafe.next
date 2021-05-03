import React from "react";
import styled from "styled-components";

import { CARD_AFFILIATE } from "../../../../../constants/messages/affiliate";
import Modal from "../../../controls/Modal";

const AffiliateNoteWrapper = styled.aside`
  font-size: 0.7em;
`;

const AffiliateNote = () => (
  <AffiliateNoteWrapper>
    <em>
      This read contains{" "}
      <strong>
        <Modal with={CARD_AFFILIATE()} unmarked>
          affiliate links
        </Modal>
      </strong>
      .
    </em>
  </AffiliateNoteWrapper>
);

export default AffiliateNote;
