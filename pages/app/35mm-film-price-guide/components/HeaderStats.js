import React from "react";
import styled from "styled-components";

import { CURRENCY, DATE, FILM_PRICE_DATA, routes } from "../constants";
import { c_black, c_grey_dark } from "../../../../constants/styles/colors";
import { dateFromUnix } from "../../../../utils/time";
import { filmPriceStats, generateAnchor } from "../utils";
import Link from "../../../../core/components/controls/Link";

const HeaderStats = styled.ul`
  display: ${props => props.hidden && "none"};
  margin: 0.5em 0 !important;
  color: ${c_grey_dark};
  font-size: 0.7em;
  font-style: italic;
  li {
    line-height: 1.5em !important;
    padding-bottom: 0 !important;
    span {
      font-style: normal;
      color: ${c_black};
      font-size: 1.05em;
    }
  }
`;

export default props => {
  const { userCurrency, filmSearchTerm } = props;
  return (
    <HeaderStats hidden={filmSearchTerm !== ""}>
      <li>
        Film price average:{" "}
        <span>
          {CURRENCY.SYMBOL[userCurrency]}
          {filmPriceStats(userCurrency).avg} per single 35mm/36 roll.
        </span>
      </li>
      <li>
        Most expensive:{" "}
        <span>
          {CURRENCY.SYMBOL[userCurrency]}
          {(() => {
            const priciest = filmPriceStats(userCurrency).priciest;
            const priciestData = FILM_PRICE_DATA[priciest.position];
            return (
              <>
                {priciest.price}{" "}
                <Link
                  onClick={event => {
                    props.setHash(
                      "#" +
                        generateAnchor(
                          priciestData.brand,
                          priciestData.make,
                          priciestData.iso
                        )
                    );
                  }}
                  to={
                    routes.self +
                    "#" +
                    generateAnchor(
                      priciestData.brand,
                      priciestData.make,
                      priciestData.iso
                    )
                  }
                >
                  {priciestData.brand} {priciestData.make} {priciestData.iso}
                </Link>
              </>
            );
          })()}
          .
        </span>
      </li>
      <li>
        Cheapest:{" "}
        <span>
          {CURRENCY.SYMBOL[userCurrency]}
          {(() => {
            const cheapest = filmPriceStats(userCurrency).cheapest;
            const cheapestData = FILM_PRICE_DATA[cheapest.position];
            return (
              <>
                {cheapest.price}{" "}
                <Link
                  onClick={event => {
                    props.setHash(
                      "#" +
                        generateAnchor(
                          cheapestData.brand,
                          cheapestData.make,
                          cheapestData.iso
                        )
                    );
                  }}
                  to={
                    routes.self +
                    "#" +
                    generateAnchor(
                      cheapestData.brand,
                      cheapestData.make,
                      cheapestData.iso
                    )
                  }
                >
                  {cheapestData.brand} {cheapestData.make} {cheapestData.iso}
                </Link>
              </>
            );
          })()}
          .
        </span>
      </li>
      <li>&nbsp;</li>
      <li>
        Rolls tracked: <span>{filmPriceStats(userCurrency).count}</span>.
      </li>
      <li>&nbsp;</li>
      <li>
        Stores surveyed:{" "}
        <span>
          Analogue Wonderland, Buy Film Canada, Film Photography Project,
          Adorama, BH Photo, Freestyle Photo, Macodirect, and Walmart.
        </span>
      </li>
      <li>
        Last updated: <span>{dateFromUnix(DATE.modified).human}</span>
      </li>
    </HeaderStats>
  );
};
