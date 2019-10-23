import React from "react";
import styled from "styled-components";

import { c_black } from "../../../../../constants/styles/colors";

const PictureMenu = styled.div`
  position: absolute;
  z-index: 12;
  border-radius: 0.25em;
  overflow: hidden;
  margin-top: 0.5em;
  margin-left: 0;

  button {
    border: 0;
    font-size: 1em;
    cursor: pointer;
  }
  button.delete {
    border-right: 4px solid ${c_black};
  }
`;
export default props => {
  return (
    <PictureMenu>
      <button
        onMouseDown={event => {
          event.preventDefault();
          props.removePicture();
        }}
        className="delete"
      >
        Delete
      </button>
      <button
        onMouseDown={event => {
          event.preventDefault();
          props.featurePicture();
        }}
        title="⌘ + F"
      >
        Resize
      </button>
    </PictureMenu>
  );
};
