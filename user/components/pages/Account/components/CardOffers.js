import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { API } from "../../../../../constants/router/defaults";
import { CardIntegratedForColumns } from "../../../../../core/components/controls/Card/components/CardColumns";
import { CardWithDocketsInfo } from "../../../../../core/components/controls/Card/components/CardWithDockets";
import { c_yellow } from "../../../../../constants/styles/colors";
import { m_column_lg } from "../../../../../constants/styles/measurements";
import CardHeader from "../../../../../core/components/controls/Card/components/CardHeader";
import Link from "../../../../../core/components/controls/Link";
import LinkButton from "../../../../../core/components/controls/Button/components/LinkButton";
import ga from "../../../../../utils/data/ga";
import puppy from "../../../../../utils/puppy";

const OfferDocketsInfo = styled(CardWithDocketsInfo)`
  float: none;
  width: calc(100% - 1em);
  line-height: 1em;

  height: 8.575em;
  @media (max-width: ${m_column_lg}) {
    height: auto;
  }
`;

export default () => {
  const request = {
    url: API.ADS,
    method: "get",
    params: {
      location: "account",
    },
  };
  const [adContent, setAdContent] = useState();
  useEffect(() => {
    if (typeof window !== "undefined") {
      !adContent &&
        puppy(request)
          .then(r => r.json())
          .then(response => {
            setAdContent(response);
          })
          .catch(() => {});
    }
  }, [adContent]);

  return (
    <CardIntegratedForColumns>
      <CardHeader
        buttons={[0]}
        stubborn
        noStar
        title="Offers, Discounts, Promo Codes"
      />
      <OfferDocketsInfo style={{ overflow: "scroll" }}>
        {adContent &&
          adContent.items &&
          adContent.items.map(
            (item, iterable) =>
              item.link &&
              item.title && (
                <p key={iterable}>
                  <small>
                    <Link
                      style={{ background: c_yellow }}
                      to={item.link}
                      onClick={() => {
                        ga("event", {
                          category: "Ads",
                          action: "Account.offers",
                          label: item.link,
                        });
                      }}
                    >
                      {item.title}
                    </Link>
                    {item.description && (
                      <>
                        {" "}
                        <em>{item.description}</em>
                      </>
                    )}
                  </small>
                </p>
              )
          )}
      </OfferDocketsInfo>
      <LinkButton branded href="/shop">
        Analog.Cafe Shop
      </LinkButton>
    </CardIntegratedForColumns>
  );
};
