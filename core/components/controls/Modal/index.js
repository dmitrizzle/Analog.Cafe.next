import { useDispatch } from "react-redux";
import React, { useEffect } from "react";

import { DynamicMenu } from "../Card";
import { DynamicModalAd } from "./components/ModalCard";
import { fetchModal, setModal } from "../../../store/actions-modal";
import { withRedux } from "../../../../utils/with-redux";
import Button from "../Button";
import ModalLink from "./components/ModalLink";

const ModalLauncher = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dynamic component preloaders
    const preloadsDelay = setTimeout(() => {
      clearTimeout(preloadsDelay);
      DynamicMenu.render.preload();
      DynamicModalAd.render.preload();
    }, 500);
    return () => clearTimeout(preloadsDelay);
  });

  const { element, ...rest } = props;
  const componentProps = {
    ...rest,
    onClick: event => {
      event.stopPropagation();
      event.preventDefault();

      props.with.request
        ? dispatch(fetchModal(props.with.request))
        : dispatch(
            setModal(
              {
                status: "ok",
                info: props.with.info,
              },
              { url: props.with.id }
            )
          );
    },
  };

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
