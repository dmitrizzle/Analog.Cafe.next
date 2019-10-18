import React from "react";
import styled from "styled-components";

import { eventGA } from "../../../../../utils/data/ga";
import Figure from "../../../vignettes/Picture/components/Figure";
import Label from "../../../vignettes/Label";
import Link from "../../../controls/Link";
import LinkButton from "../../../controls/Button/components/LinkButton";

export const AdOverlay = styled.div`
  bottom: 0.5em;
  z-index: 10;
  position: absolute;
  width: 100%;
`;
export const AdLabel = styled(Label)`
  margin: 0 auto;
  display: block;
  width: 5em;
  text-align: center;
`;

export const AdWrapper = styled.div`
  margin: 3em 0;
  position: relative;
`;

export default props => {
  return (
    <AdWrapper>
      <Link
        to="https://photoklassik-international.com/shop/ref/29/"
        onClick={() => {
          eventGA({
            category: "Ads",
            action: "Article.poster",
            label: props.url,
          });
        }}
      >
        <Figure feature src="image-froth_1500000_B1jOlsItr" />
      </Link>
      <AdOverlay>
        <LinkButton
          branded
          to="https://photoklassik-international.com/shop/ref/29/"
          onClick={() => {
            eventGA({
              category: "Ads",
              action: "Article.button",
              label: props.url,
            });
          }}
        >
          Buy Now
        </LinkButton>
        <AdLabel inverse>Promotion</AdLabel>
      </AdOverlay>
    </AdWrapper>
  );
};
