import { useSelector, useDispatch } from "react-redux";
import React from "react";
import styled from "styled-components";

import { fadeIn } from "../../../../../constants/styles/animation";
import { hideModal } from "../../../../store/actions-modal";
import { withRedux } from "../../../../../utils/with-redux";
import ModalCard from "./ModalCard";
import ga from "../../../../../utils/data/ga";

const Overlay = styled.aside`
  display: ${props => (props.hidden ? "none" : "block")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${({ supersedesMessage }) => (supersedesMessage ? 32 : 30)};

  overflow: ${({ children }) =>
    children?.props?.signin ? "hidden" : "scroll"};
  overflow: scroll;

  -webkit-overflow-scrolling: touch;
  -webkit-tap-highlight-color: transparent;
  background: ${({ theme }) => theme.fg_overlay};
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

const ModalOverlay = () => {
  const dispatch = useDispatch();
  const modal = useSelector(state => state.modal);

  if (!modal.hidden && modal.status === "ok" && modal.info) {
    ga("event", {
      category: "modal",
      action: (() => {
        if (modal.requested?.url) return "fetch";
        return "system";
      })(),
      label:
        modal.id ||
        modal.requested?.url ||
        (typeof modal.info.title === "string"
          ? modal.info.title
              .toLowerCase()
              .replace(/[^a-z]/gi, " ")
              .trim()
              .replace(/ /gi, "-")
          : modal.info.signin
          ? "sign-in"
          : ""),
    });
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
      supersedesMessage={modal.info?.signin}
      onClick={() => dispatch(hideModal())}
      // onScroll={event =>
      //   modalScrollCallback(event.target, () => dispatch(hideModal()))
      // }
    >
      <ModalCard {...transferProps} />
    </Overlay>
  );
};

export default withRedux(ModalOverlay);
