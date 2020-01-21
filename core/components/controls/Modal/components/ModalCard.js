import React from "react";
import dynamic from "next/dynamic";

import Card from "../../Card";

const ModalAd = dynamic(() => import("./ModalAd"), {
  ssr: false,
});

//90.1vh
export default props => {
  return (
    <>
      <Card {...props} style={{ margin: `3em auto 0` }} id="modal-card" />
      {props.ad && <ModalAd {...props} />}
    </>
  );
};
