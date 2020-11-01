import React from "react";

import { ModalAdWrapper } from "./ModalAdWrapper";
import { c_red, c_white } from "../../../../../constants/styles/themes";
import Card from "../../Card";

// export const ModalAd = dynamic(() => import("./ModalAd"), {
//   ssr: false,
// });

//90.1vh
const ModalCard = props => {
  return (
    <>
      <Card
        {...props}
        style={{ margin: `3.5em auto ${props.signin ? "0" : "50vh"}` }}
        id="modal-card"
      />
      {props.signin && (
        <>
          <p style={{ textAlign: "center", color: c_red, margin: "1em 0 0" }}>
            ↓
          </p>
          <ModalAdWrapper onClick={event => event.stopPropagation()}>
            <Card headless stubborn signInWithSocial={1} />
          </ModalAdWrapper>
          <p style={{ textAlign: "center", color: c_white, margin: "-.75em" }}>
            <small>
              <em>— or —</em>
            </small>
          </p>
          <ModalAdWrapper onClick={event => event.stopPropagation()}>
            <Card headless stubborn signinWithEmail={1} />
          </ModalAdWrapper>
        </>
      )}

      {/* props.ad && <ModalAd {...props} /> */}
    </>
  );
};
export default ModalCard;
