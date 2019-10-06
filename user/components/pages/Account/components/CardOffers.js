import React from "react";

import { CardIntegratedForColumns } from "../../../../../core/components/controls/Card/components/CardColumns";
import { CardWithDocketsInfo } from "../../../../../core/components/controls/Card/components/CardWithDockets";
import CardHeader from "../../../../../core/components/controls/Card/components/CardHeader";
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
        ☞{" "}
        <em>
          <Link to="https://www.etsy.com/ca/shop/FilmBase?coupon=CAFE10">
            <strong>10% Off Film Cameras</strong> on Etsy
          </Link>
        </em>
      </small>
      <br />
      <small>
        ☞{" "}
        <em>
          <Link to="/apps-and-downloads">
            <strong>Free Downloads</strong> on Analog.Cafe
          </Link>
        </em>
      </small>
    </CardWithDocketsInfo>
  </CardIntegratedForColumns>
);
