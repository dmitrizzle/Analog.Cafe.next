import React from "react";

import { CardIntegratedForColumns } from "../../../../../core/components/controls/Card/components/CardColumns";
import { CardWithDocketsInfo } from "../../../../../core/components/controls/Card/components/CardWithDockets";
import { c_yellow } from "../../../../../constants/styles/colors";
import CardHeader from "../../../../../core/components/controls/Card/components/CardHeader";
import Link from "../../../../../core/components/controls/Link";
import LinkButton from "../../../../../core/components/controls/Button/components/LinkButton";

export default () => (
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
        height: "7.655em",
        lineHeight: "1em",
      }}
    >
      <p>
        <small>
          <Link
            style={{ background: c_yellow }}
            to="https://photoklassik-international.com/shop/ref/29/"
          >
            10% Off PhotoKlassik Magazine!
          </Link>{" "}
          <em>Use promo code: AnalogCafe at checkout.</em>
        </small>
      </p>
      <p>
        <small>
          <Link
            style={{ background: c_yellow }}
            to="https://www.etsy.com/ca/shop/FilmBase?coupon=CAFE10"
          >
            10% Off Film Cameras
          </Link>{" "}
          <em>on Etsy.</em>
        </small>
      </p>
    </CardWithDocketsInfo>
    <LinkButton href="/offers">Browse All Offers</LinkButton>
  </CardIntegratedForColumns>
);
