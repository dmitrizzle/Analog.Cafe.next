import React from "react";
import styled from "styled-components";

import { CURRENCY, FILM_PRICE_DATA, routes } from "../constants";
import { b_phablet } from "../../../constants/styles/measurements";
import { filmPriceStats, generateAnchor } from "../utils";
import Link from "../../../core/components/controls/Link";

const HeaderStats = styled.ul`
  display: ${props => props.hidden && "none"};
  margin: 0.5em 0 !important;
  color: ${({ theme }) => theme.grey_light};
  font-size: 0.7em;
  font-style: italic;
  li {
    line-height: 1.5em !important;
    padding-bottom: 0 !important;
    span {
      font-style: normal;
      color: ${({ theme }) => theme.fg};
      font-size: 1.05em;
    }
  }
  @media (max-width: ${b_phablet}) {
    display: none;
  }
`;

const HeaderStatsMain = props => {
  const { userCurrency, filmSearchTerm } = props;

  return (
    <>
      {/* <div
        style={{ margin: "0 0 .5em .15em" }}
        title={`Price history chart for film price average.`}
      >
        <Graph userCurrency={userCurrency} dimensions={{ w: 90, h: 15 }} />
      </div> */}

      <HeaderStats hidden={filmSearchTerm !== ""}>
        <li>
          Compound price average:{" "}
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
                    onClick={() => {
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
                    onClick={() => {
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
      </HeaderStats>
    </>
  );
};
export default HeaderStatsMain;
