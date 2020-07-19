import React from "react";
import styled from "styled-components";

const PictureMenu = styled.div`
  position: absolute;
  z-index: 12;
  border-radius: 0.25em;
  overflow: hidden;
  margin-top: ${props => (props.feature ? 0.5 : 0.75)}em;
  @media (max-width: 630px) {
    margin-left: ${props => (props.feature ? 0 : 0.5)}em;
  }

  button {
    border: 0;
    font-size: 1em;
    cursor: pointer;
  }
  button.delete {
    border-right: 4px solid ${({ theme }) => theme.fg};
  }
`;
export default props => {
  return (
    <PictureMenu feature={props.feature}>
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
