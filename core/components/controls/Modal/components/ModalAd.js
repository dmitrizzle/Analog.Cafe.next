import React from "react";

import Card from "../../Card";
import Label from "../../../vignettes/Label";

export default props => (
  <Card
    noStar
    buttons={[
      <Label
        onClick={event => event.stopPropagation()}
        key="label"
        style={{
          display: "block",
          margin: ".5em 0",
          height: "1em",
        }}
      >
        Partner
      </Label>,
      {
        text: "Shop Now",
        branded: true,
        to: "https://analoguewonderland.co.uk/?p=rJutywT1L",
      },
    ]}
    text={
      <>
        Analogue Wonderland is our <strong>trusted community partner.</strong>{" "}
        They sell a wide selection film at fair prices with excellent service.
      </>
    }
    stubborn
    title="Analogue Wonderland"
    style={{ margin: `3em auto 90.1vh` }}
    image="image-froth_1610000_r1WbC_bgQ"
  />
);
