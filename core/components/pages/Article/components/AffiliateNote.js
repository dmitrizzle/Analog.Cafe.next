import React from "react";
import styled from "styled-components";

import { CARD_AFFILIATE } from "../../../../../constants/messages/affiliate";
import Modal from "../../../controls/Modal";

const AffiliateNoteWrapper = styled.aside`
  font-size: 0.7em;
`;

const AffiliateLinkColour = styled.strong`
  background: ${({ theme }) => theme.grey_med};
`;

const AffiliateNote = () => (
  <AffiliateNoteWrapper>
    <em>
      This article contains{" "}
      <AffiliateLinkColour>
        <Modal with={CARD_AFFILIATE()} unmarked>
          affiliate links
        </Modal>
      </AffiliateLinkColour>
      .
    </em>
  </AffiliateNoteWrapper>
);

export default AffiliateNote;
