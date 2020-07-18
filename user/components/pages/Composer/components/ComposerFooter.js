import { useSelector } from "react-redux";
import React from "react";
import styled from "styled-components";

import { HINTS } from "../../../../../constants/composer";
import { withRedux } from "../../../../../utils/with-redux";
import Modal from "../../../../../core/components/controls/Modal";
import WordCounter from "./WordCounter";
import isIncompleteDraft from "../../../../../utils/editor/is-incomplete-draft";

const ComposerFooterWrapper = styled.div`
  button {
    font-size: 1em;
  }
  p {
    text-align: center;
    color: ${({ theme }) => theme.grey_dark};
  }
`;

const ComposerFooter = () => {
  const composer = useSelector(state => state.composer);
  return (
    <ComposerFooterWrapper>
      <Modal
        with={
          isIncompleteDraft()
            ? HINTS.INCOMPLETE_DRAFT
            : HINTS.SUBMISSION_AGREEMENT
        }
        element="Button"
        branded
      >
        Submit for Review
      </Modal>
      <p>
        <em>
          Your draft is{" "}
          <Modal with={HINTS.SAVE}>
            {composer.editStatus === "ok" ? "saved." : "saving…"}
          </Modal>{" "}
          You’ve written <WordCounter /> words.
        </em>
      </p>
    </ComposerFooterWrapper>
  );
};

export default withRedux(ComposerFooter);
