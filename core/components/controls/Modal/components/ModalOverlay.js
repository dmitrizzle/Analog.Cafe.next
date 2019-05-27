import React from "react";
import styled from "styled-components";

import {
  c_transparent,
  c_white_a75
} from "../../../../../constants/styles/colors";
import ModalCard from "./ModalCard";

const Overlay = styled.aside`
  display: ${props => (props.hidden ? "none" : "block")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 30;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  -webkit-tap-highlight-color: ${c_transparent};
  background: ${c_white_a75};
`;

export const modalScrollCallback = (target, callback) => {
  if (!target) return;
  const scrollPosition = target.scrollTop;
  if (!scrollPosition) return;
  const scrollLimitUpper = target.scrollHeight - target.clientHeight;
  const scrollAvailableUpper = scrollLimitUpper - scrollPosition;
  return scrollAvailableUpper === 0 ? callback() : null;
};

const ModalOverlay = props => {
  if (!props.modal.hidden && props.modal.status === "ok") {
    // GA.modalview(
    //   props.modal.requested.url.replace(HOST_API, "").replace(HOST_RUNTIME, "")
    // )
  }
  if (process.browser) {
    document.onkeydown = event => {
      if (
        event.keyCode === 27 &&
        !props.modal.info.stubborn &&
        !props.modal.hidden
      )
        props.hideModal();
    };
  }
  const transferProps = props.modal.info;
  return (
    <Overlay
      id="modal-overlay"
      hidden={props.modal.hidden}
      // onClick={() => props.hideModal()}
      onScroll={event => modalScrollCallback(event.target, props.hideModal)}
    >
      <ModalCard {...transferProps} />
    </Overlay>
  );
};

export default ModalOverlay;
