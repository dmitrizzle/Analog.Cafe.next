import React from "react";
// import dynamic from "next/dynamic";

import Card from "../../Card";

// export const ModalAd = dynamic(() => import("./ModalAd"), {
//   ssr: false,
// });

//90.1vh
export default props => {
  return (
    <>
      <Card
        {...props}
        style={{ margin: `3em auto ${/* props.ad ? "0" : */ "90.1vh"}` }}
        id="modal-card"
      />
      {/* props.ad && <ModalAd {...props} /> */}
    </>
  );
};
