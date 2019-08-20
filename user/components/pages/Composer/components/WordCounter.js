import { connect } from "react-redux";
import { loadTextContent } from "@roast-cms/french-press-editor/dist/utils/storage";
import React from "react";

export default connect(
  state => {
    return { composer: state.composer };
  },
  null
)(() => <span>{loadTextContent().split(" ").length + 1}</span>);
