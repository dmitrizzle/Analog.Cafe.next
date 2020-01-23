import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { API } from "../../../../../constants/router/defaults";
import { responseCache } from "../../../../../utils/storage/ls-cache";
import Card from "../../Card";
import Label from "../../../vignettes/Label";
import ga from "../../../../../utils/data/ga";
import puppy from "../../../../../utils/puppy";

const animationUnfold = keyframes`
  from {  opacity: 0  }
  to {  opacity; 1  }
`;

const AdWrapper = styled.div`
  > div {
    margin: 3em auto 90.1vh;
    transform: translateZ(0);

    animation-fill-mode: forwards;
    animation: ${animationUnfold} 250ms;
  }
`;

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

    const cache = responseCache.get(request);
    if (cache) return setAdInventory(cache);

    puppy(request)
      .then(r => r.json())
      .then(response => {
        if (response.items) {
          setAdInventory(response);
          responseCache.set(request, response, 10);
        }
      })
      .catch(() => {});
  }, [adInventory]);

  if (!adInventory) return null;
  const { items } = adInventory;
  const ad = items[Math.floor(Math.random() * items.length)];

  const { title, referral, description, buttons, poster } = ad;
  return (
    <AdWrapper>
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
                  category: "Campaign",
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
        image={poster}
      />
    </AdWrapper>
  );
};
