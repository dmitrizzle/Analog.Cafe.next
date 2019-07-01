import { connect } from "react-redux";
import React from "react";
import styled from "styled-components";

import { HINTS } from "../../../../../constants/composer";
import { c_grey_dark } from "../../../../../constants/styles/colors";
import Modal from "../../../../../core/components/controls/Modal";
import WordCounter from "./WordCounter";

const ComposerFooterWrapper = styled.div`
  button {
    font-size: 1em;
  }
  p {
    text-align: center;
    color: ${c_grey_dark};
  }
`;

const ComposerFooter = props => (
  <ComposerFooterWrapper>
    <Modal with={HINTS.SUBMIT} element="Button" branded>
      Submit for Review
    </Modal>
    <p>
      <em>
        Your draft is{" "}
        <Modal with={HINTS.SAVE}>
          {props.status === "ok" ? "saved." : "saving…"}
        </Modal>{" "}
        You’ve written <WordCounter /> words.
      </em>
    </p>
  </ComposerFooterWrapper>
);

export default connect(
  ({ composer }) => composer,
  null
)(ComposerFooter);
