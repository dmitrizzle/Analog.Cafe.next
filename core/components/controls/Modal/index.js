import { useDispatch } from "react-redux";
import React, { useEffect } from "react";

import { Menu, Bookmarks } from "../Card";
// import { ModalAd } from "./components/ModalCard";
import { fetchModal, setModal } from "../../../store/actions-modal";
import { withRedux } from "../../../../utils/with-redux";
import Button from "../Button";
import ModalLink from "./components/ModalLink";

const ModalLauncher = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dynamic component preloaders, 2 seconds after mount
    const preloadsDelay = setTimeout(() => {
      clearTimeout(preloadsDelay);
      Menu.render.preload();
      Bookmarks.render.preload();
      // ModalAd.render.preload();
    }, 2000);
    return () => clearTimeout(preloadsDelay);
  });

  const { element, innerRef, ...rest } = props;
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
    <ModalLink
      {...componentProps}
      href={props.href || "#card"}
      ref={innerRef}
      title={props.title || `Open card`}
    >
      {props.children}
    </ModalLink>
  );
};

export default withRedux(ModalLauncher);
