import { useSelector, useDispatch } from "react-redux";
import React from "react";
import styled from "styled-components";

import {
  c_transparent,
  c_white_a75,
} from "../../../../../constants/styles/colors";
import { fadeIn } from "../../../../../constants/styles/animation";
import { hideModal } from "../../../../store/actions-modal";
import ModalCard from "./ModalCard";
import document from "../../../../../pages/_document";
import ga from "../../../../../utils/data/ga";

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
  const dispatch = useDispatch();
  const modal = useSelector(state => state.modal);

  if (!modal.hidden && modal.status === "ok" && modal.requested) {
    ga("modalview", { url: modal.requested.url });
  }
  if (process.browser) {
    document.onkeydown = event => {
      if (event.keyCode === 27 && !modal.info.stubborn && !modal.hidden)
        dispatch(hideModal());
    };
  }
  const transferProps = modal.info;
  return (
    <Overlay
      id="modal-overlay"
      hidden={modal.hidden}
      onClick={() => dispatch(hideModal())}
      onScroll={event =>
        modalScrollCallback(event.target, () => dispatch(hideModal()))
      }
    >
      <ModalCard {...transferProps} />
    </Overlay>
  );
};

export default ModalOverlay;
