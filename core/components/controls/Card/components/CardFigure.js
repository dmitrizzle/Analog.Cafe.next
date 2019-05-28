import React from "react";

import { makeFroth } from "../../../../../utils";
import CardCaption from "./CardCaption";
import Placeholder from "../../../vignettes/Picture/components/Placeholder";

export default props => {
  return (
    <figure
      onClick={event => event.stopPropagation()}
      style={{ marginBottom: "-1px" }}
    >
      <Placeholder frothId={props.image}>
        <img src={makeFroth({ src: props.image, size: "s" }).src} alt="Card" />
      </Placeholder>
      <figcaption>
        <CardCaption
          style={{ padding: typeof props.text === "undefined" ? "0" : "" }}
        >
          {typeof props.text === "function" ? props.text() : props.text}
        </CardCaption>
      </figcaption>
    </figure>
  );
};
