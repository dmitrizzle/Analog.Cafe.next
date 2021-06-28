import { useDispatch } from "react-redux";
import React from "react";

import { hideModal } from "../../../../store/actions-modal";
import Link from "../../Link";

const ModalCaptionSelfClosingLink = ({ to, children }) => {
  const dispatch = useDispatch();
  return (
    <Link
      to={to}
      onClick={() => {
        dispatch(hideModal());
      }}
    >
      {children}
    </Link>
  );
};

export default ModalCaptionSelfClosingLink;
