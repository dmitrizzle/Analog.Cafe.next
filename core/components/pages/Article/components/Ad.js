import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { API } from "../../../../../constants/router/defaults";
import { b_phablet } from "../../../../../constants/styles/measurements";
import { eventGA } from "../../../../../utils/data/ga";
import Figure from "../../../vignettes/Picture/components/Figure";
import Label from "../../../vignettes/Label";
import Link from "../../../controls/Link";
import LinkButton from "../../../controls/Button/components/LinkButton";
import puppy from "../../../../../utils/puppy";

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

export const ActionButton = styled(LinkButton)`
  @media (max-width: ${b_phablet}) {
    display: none;
  }
`;

export const AdWrapper = styled.div`
  margin: 6em 0 6em;
  position: relative;
`;

export default props => {
  const request = {
    url: API.ADS,
    method: "get",
    params: {
      location: "article",
      tag: props.article.tag,
    },
  };

  const [adContent, setAdContent] = useState();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // only send requests with valid tags
      props.article.tag &&
        puppy(request)
          .then(r => r.json())
          .then(response => {
            setAdContent(response.items[0]);
          })
          .catch(() => {});
    }

    // send request on new article view
  }, [props.article.id]);

  return adContent && adContent.link && adContent.image ? (
    <AdWrapper>
      <Link
        to={adContent.link}
        onClick={() => {
          eventGA({
            category: "Ads",
            action: "Article.poster",
            label: adContent.link,
          });
        }}
      >
        <Figure feature src={adContent.image} />
      </Link>
      <AdOverlay>
        {adContent.action && (
          <ActionButton
            branded
            to={adContent.link}
            onClick={() => {
              eventGA({
                category: "Ads",
                action: "Article.button",
                label: adContent.link,
              });
            }}
          >
            {adContent.action}
          </ActionButton>
        )}
        <AdLabel inverse>Promotion</AdLabel>
      </AdOverlay>
    </AdWrapper>
  ) : null;
};
