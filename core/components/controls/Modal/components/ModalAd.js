import React, { useState, useEffect } from "react";

import { API } from "../../../../../constants/router/defaults";
import Card from "../../Card";
import Label from "../../../vignettes/Label";
import ga from "../../../../../utils/data/ga";
import puppy from "../../../../../utils/puppy";

const AD_INVENTORY = {
  title: "Analogue Wonderland",
  referral: "https://analoguewonderland.co.uk/?p=rJutywT1L",
  poster: "image-froth_1610000_r1WbC_bgQ",
  description:
    "Analogue Wonderland is our trusted community partner. They sell a wide selection film at fair prices with excellent service.",
  buttons: [
    {
      text: "Shop Now",
      to: "REFERRAL",
    },
  ],
};

export default () => {
  const request = {
    url: API.ADS,
    method: "get",
    params: {
      location: "modal",
    },
  };
  const [adInventory, setAdInventory] = useState();
  useEffect(() => {
    if (!process.browser || adInventory) return;
    puppy(request)
      .then(r => r.json())
      .then(response => {
        setAdInventory(response);
      })
      .catch(() => {});
  }, [adInventory]);

  if (!adInventory) return null;
  const { items } = adInventory;
  const ad = items[Math.floor(Math.random() * items.length)];

  const { title, referral, description, buttons, poster } = ad;
  return (
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
        ...buttons.map(({ text, to }) => {
          return {
            text,
            branded: to === "REFERRAL",
            to: to === "REFERRAL" ? referral : to,
            onClick: () => {
              ga("event", {
                category: "Ad",
                action: "Modal.click",
                label: to === "REFERRAL" ? referral : to,
              });
            },
          };
        }),
      ]}
      text={description}
      stubborn
      title={title}
      style={{ margin: `3em auto 90.1vh` }}
      image={poster}
    />
  );
};
