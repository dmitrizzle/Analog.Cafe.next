// eslint-disable-next-line
import React from "react";

import { CURRENCY, FILM_PRICE_DATA } from "./constants";

export const roundToCents = n => Math.round(n * 100) / 100;
export const roundCurrency = (value, currency) => {
  return currency === "jpy" || currency === "thb"
    ? Math.round(value)
    : roundToCents(value);
};
export const filmPriceStats = currency => {
  let sum = 0;
  let count = 0;
  let cheapest = { price: 10000 };
  let priciest = { price: 0 };
  FILM_PRICE_DATA.forEach(item => {
    const price = item.price[0].avg.cad;
    if (price > priciest.price) {
      priciest.price = price;
      priciest.position = count;
    }
    if (price < cheapest.price) {
      cheapest.price = price;
      cheapest.position = count;
    }
    sum += price;
    count++;
  });

  return {
    avg: roundCurrency((sum / count) * CURRENCY.EXCHANGE[currency], currency),
    count,
    cheapest: {
      price: roundCurrency(
        cheapest.price * CURRENCY.EXCHANGE[currency],
        currency
      ),
      position: cheapest.position,
    },
    priciest: {
      price: roundCurrency(
        priciest.price * CURRENCY.EXCHANGE[currency],
        currency
      ),
      position: priciest.position,
    },
  };
};

export const generateAnchor = (brand, make, iso) => {
  return (brand + "-" + make + "-" + iso).toLowerCase().replace(/ /g, "-");
};
