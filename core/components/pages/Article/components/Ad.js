import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { API } from "../../../../../constants/router/defaults";
import {
  b_phablet,
  m_radius_sm,
} from "../../../../../constants/styles/measurements";
import {
  c_red,
  c_grey_med,
  c_white,
} from "../../../../../constants/styles/colors";
import { eventGA } from "../../../../../utils/data/ga";
import Figure from "../../../vignettes/Picture/components/Figure";
import Label from "../../../vignettes/Label";
import Link from "../../../controls/Link";
import LinkButton from "../../../controls/Button/components/LinkButton";
import puppy from "../../../../../utils/puppy";
import CardHeader from "../../../controls/Card/components/CardHeader";
import Present from "../../../icons/Present";

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
  @media (max-width: ${b_phablet}) {
    background: ${c_red};
  }
`;

export const ActionButton = styled(LinkButton)`
  @media (max-width: ${b_phablet}) {
    display: none;
  }
`;

export const AdWrapper = styled.div`
  margin: 6em 0 6em;
  position: relative;
  header {
    display: none;
  }

  @media (max-width: 480px) {
    header {
      display: block;
      background: ${c_red};
    }
    margin: 1.5em auto;
    max-width: 360px;

    border-radius: ${m_radius_sm};
    box-shadow: 0 0 0 1px ${c_grey_med};
    overflow: hidden;
    a {
      text-decoration: none;
      color: ${c_white};
    }

    figure {
      margin: 0;
      width: 100% !important;
    }
  }
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

  return adContent && adContent.link && adContent.poster ? (
    <AdWrapper id="promo">
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
        <CardHeader
          stubborn
          buttons={[0]}
          noStar
          title={
            <>
              <Present
                style={{
                  height: ".75em",
                  marginTop: "-.25em",
                  paddingRight: ".33em",
                }}
              />
              Today’s Promotion
            </>
          }
        />
        <Figure feature src={adContent.poster} />
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
