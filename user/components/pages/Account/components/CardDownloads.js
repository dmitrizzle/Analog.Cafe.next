import React from "react";

import { CardIntegratedForColumns } from "../../../../../core/components/controls/Card/components/CardColumns";
import { CardWithDocketsInfo } from "../../../../../core/components/controls/Card/components/CardWithDockets";
import CardHeader from "../../../../../core/components/controls/Card/components/CardHeader";
import LinkButton from "../../../../../core/components/controls/Button/components/LinkButton";
import Link from "../../../../../core/components/controls/Link";

export default () => (
  <CardIntegratedForColumns>
    <CardHeader buttons={[0]} stubborn noStar title="Offers and Discounts" />
    <CardWithDocketsInfo
      style={{
        float: "none",
        width: "calc(100% - 1em)",
        height: "11.25em",
      }}
    >
      <small>
        ☞ <em><Link>5% Off at Etsy Store</Link></em>
      </small>
    </CardWithDocketsInfo>
  </CardIntegratedForColumns>
);
