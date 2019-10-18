import React, { useState, useEffect } from "react";

import { API } from "../../../../../constants/router/defaults";
import { CardIntegratedForColumns } from "../../../../../core/components/controls/Card/components/CardColumns";
import { CardWithDocketsInfo } from "../../../../../core/components/controls/Card/components/CardWithDockets";
import { c_yellow } from "../../../../../constants/styles/colors";
import CardHeader from "../../../../../core/components/controls/Card/components/CardHeader";
import Link from "../../../../../core/components/controls/Link";
import puppy from "../../../../../utils/puppy";

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
      <CardWithDocketsInfo
        style={{
          float: "none",
          width: "calc(100% - 1em)",
          // height: "7.655em",
          height: "10.25em",
          lineHeight: "1em",
        }}
      >
        {adContent &&
          adContent.items &&
          adContent.items.map(
            (item, iterable) =>
              item.link &&
              item.title && (
                <p key={iterable}>
                  <small>
                    <Link style={{ background: c_yellow }} to={item.link}>
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
      </CardWithDocketsInfo>
      {/*<LinkButton href="/offers">Browse All Offers</LinkButton>*/}
    </CardIntegratedForColumns>
  );
};
