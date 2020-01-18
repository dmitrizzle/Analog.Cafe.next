import { useDispatch } from "react-redux";
import React from "react";

import { fetchModal, setModal } from "../../../store/actions-modal";
import { withRedux } from "../../../../utils/with-redux";
import Button from "../Button";
import ModalLink from "./components/ModalLink";

export const launchModal = function(event) {
  const dispatch = useDispatch();

  event.stopPropagation();
  event.preventDefault();
  this.props.with.request
    ? useDispatch(fetchModal(this.props.with.request))
    : useDispatch(
        setModal(
          {
            status: "ok",
            info: this.props.with.info,
          },
          { url: this.props.with.id }
        )
      );
};

const ModalLauncher = props => {
  // eslint-disable-next-line
  const { element, setModal, fetchModal, ...rest } = props;
  const componentProps = { ...rest, onClick: launchModal.bind({ props }) };

  if (element && element !== "Button" && element !== "a")
    return <element {...componentProps}>{props.children}</element>;

  if (element === "Button")
    return <Button {...componentProps}>{props.children}</Button>;

  return (
    <ModalLink {...componentProps} href={props.href || "#card"}>
      {props.children}
    </ModalLink>
  );
};

export default withRedux(ModalLauncher);
