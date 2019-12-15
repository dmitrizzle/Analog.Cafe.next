import { connect } from "react-redux";
import React from "react";
import styled, { keyframes } from "styled-components";
import ga from "../../../../../utils/data/ga";
import {
  c_transparent,
  c_white_a75,
} from "../../../../../constants/styles/colors";
import { hideModal } from "../../../../store/actions-modal";
import ModalCard from "./ModalCard";

const fadeIn = keyframes`
  from {
    background: rgba(255,255,255,0)
  }
  to {
    background: ${c_white_a75};
  }
`;

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
  animation: ${fadeIn} 250ms;
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
  if (
    !props.modal.hidden &&
    props.modal.status === "ok" &&
    props.modal.requested
  ) {
    ga("modalview", { url: props.modal.requested.url });
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
      onClick={() => props.hideModal()}
      onScroll={event => modalScrollCallback(event.target, props.hideModal)}
    >
      <ModalCard {...transferProps} />
    </Overlay>
  );
};

const mapStateToProps = ({ modal }) => {
  return { modal };
};
const mapDispatchToProps = dispatch => {
  return {
    hideModal: () => {
      dispatch(hideModal());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalOverlay);
