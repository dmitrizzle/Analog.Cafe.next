import { CURRENCY, FILM_PRICE_DATA } from "./constants";

export const roundToCents = n => Math.round(n * 100) / 100;
export const roundCurrency = (value, currency) => {
  return currency === "jpy" || currency === "thb"
    ? Math.round(value)
    : roundToCents(value);
};
export const filmPriceStats = (currency = "cad") => {
  let sum = 0;
  let count = 0;
  let cheapest = { price: 10000 };
  let priciest = { price: 0 };
  let sumByDate = {};
  FILM_PRICE_DATA.forEach(item => {
    item.price.forEach(price => {
      const indexPrice = sumByDate[price.date]?.sum || 0;
      const count = sumByDate[price.date]?.count || 0;
      sumByDate[price.date] = {
        date: price.date,
        sum: indexPrice + price.avg.cad,
        count: count + 1,
      };
    });
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

  const avgByDate = Object.values(sumByDate).map(({ date, sum, count }) => {
    return {
      date,
      avg: roundCurrency((sum / count) * CURRENCY.EXCHANGE[currency], currency),
    };
  });

  return {
    avg: roundCurrency((sum / count) * CURRENCY.EXCHANGE[currency], currency),
    avgByDate,
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
