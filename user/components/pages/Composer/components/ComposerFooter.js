import { connect } from "react-redux";
import React from "react";

import { HINTS } from "../constants";
import { c_grey_dark } from "../../../../../constants/styles/colors";
import Modal from "../../../../../core/components/controls/Modal";
import WordCounter from "./WordCounter";

const ComposerFooter = props => (
  <>
    <Modal
      with={HINTS.SUBMIT}
      element="Button"
      branded
      style={{ fontSize: "1em" }}
    >
      Submit for Review
    </Modal>
    <p style={{ textAlign: "center", color: c_grey_dark }}>
      <em>
        Your draft is{" "}
        <Modal with={HINTS.SAVE}>
          {props.status === "ok" ? "saved." : "saving…"}
        </Modal>{" "}
        You’ve written <WordCounter /> words.
      </em>
    </p>
  </>
);

export default connect(
  ({ composer }) => composer,
  null
)(ComposerFooter);
