import React from "react";
import styled from "styled-components";

import { CARD_AFFILIATE } from "../../../../../constants/messages/affiliate";
import { c_charcoal, c_yellow } from "../../../../../constants/styles/themes";
import Modal from "../../../controls/Modal";

const AffiliateNoteWrapper = styled.aside`
  font-size: 0.7em;
`;

const AffiliateNote = () => (
  <AffiliateNoteWrapper>
    <em>
      This article contains{" "}
      <strong>
        <Modal with={CARD_AFFILIATE()} unmarked>
          affiliate links
        </Modal>
      </strong>{" "}
      (ads) .
    </em>
  </AffiliateNoteWrapper>
);

export default AffiliateNote;
