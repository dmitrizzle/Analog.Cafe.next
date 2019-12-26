import { NextSeo, LogoJsonLd } from "next-seo";
import React, { useState } from "react";
import styled from "styled-components";

import {
  DESCRIPTION_LONG,
  DESCRIPTION_SHORT,
  NAME,
} from "../../../constants/messages/system";
import { DOMAIN } from "../../../constants/router/defaults";
import { fetchAuthorsList } from "../../../user/store/actions-community";
import { makeFroth } from "../../../utils/froth";
import ArticleSection from "../../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../../core/components/pages/Article/components/ArticleWrapper";
import Email from "../../../core/components/vignettes/Email";
import Figure from "../../../core/components/vignettes/Picture/components/Figure";
import HeaderLarge from "../../../core/components/vignettes/HeaderLarge";
import Link from "../../../core/components/controls/Link";
import SubNav, {
  SubNavItem,
} from "../../../core/components/controls/Nav/SubNav";
import { NavLink } from "../../../core/components/controls/Nav/components/NavLinks";

import Main from "../../../core/components/layouts/Main";
import Modal from "../../../core/components/controls/Modal";
import Label from "../../../core/components/vignettes/Label";
import {
  c_red,
  c_grey_dark,
  c_grey_med,
  c_yellow,
  c_black,
} from "../../../constants/styles/colors";
import { seo, FILM_PRICE_DATA, CURRENCY } from "./constants";

import { reset } from "../../../user/components/forms/SubtitleInput";
import { headerTitleStyles } from "../../../core/components/vignettes/HeaderLarge/components/HeaderTitle";

const Summary = styled.summary`
  ::-webkit-details-marker {
    display: none;
  }
  cursor: pointer;
  outline: none;
`;

const Search = styled.input`
  ${reset};
  ${headerTitleStyles};
  padding: 0.5em 0 0.15em;
  border-bottom: 1px solid ${c_grey_med};
  margin-bottom: 0.5em;
`;

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

const roundToCents = n => Math.round(n * 100) / 100;
const roundCurrency = (value, currency) => {
  return currency === "jpy" || currency === "thb"
    ? Math.round(value)
    : roundToCents(value);
};
const filmPriceStats = currency => {
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

const Info = () => (
  <small style={{ color: c_grey_dark, fontSize: ".375em" }}>
    <u style={{ paddingRight: ".15em" }}>info</u>▾
  </small>
);

const About = props => {
  const [userCurrency, setUserCurrency] = useState("cad");
  const [filmSearchTerm, setFilmSearchTerm] = useState("");

  return (
    <>
      <NextSeo
        title={seo.title}
        description={seo.description}
        openGraph={{
          type: "website",
          images: seo.images,
        }}
      />
      <LogoJsonLd
        logo={
          DOMAIN.PROTOCOL.PRODUCTION +
          DOMAIN.APP.PRODUCTION +
          "/static/logo-1764x1764.png"
        }
        url={DOMAIN.PROTOCOL.PRODUCTION + DOMAIN.APP.PRODUCTION}
      />
      <Main>
        <ArticleWrapper>
          <HeaderLarge
            pageTitle={"35mm Film Price Guide"}
            pageSubtitle={
              "In Canadian, US, EU, UK, Japanese, and Thai currencies"
            }
          >
            <em
              style={{
                display: "block",
                color: c_grey_dark,
                lineHeight: "1em",
                paddingTop: ".5em",
              }}
            >
              <small>
                An app by <Link to="/u/dmitrizzle">Dmitri</Link>. Published in{" "}
                <Link to="/apps-and-downloads">Apps & Downloads</Link>.
              </small>
            </em>
          </HeaderLarge>
          <ArticleSection>
            <Search
              autoFocus
              placeholder="Find film…"
              onChange={event => {
                setFilmSearchTerm(event.target.value);
              }}
              value={filmSearchTerm}
              maxLength={300}
            />
            <SubNav style={{ justifyContent: "left", paddingLeft: 0 }}>
              {Object.keys(CURRENCY.EXCHANGE).map(key => (
                <SubNavItem>
                  <NavLink
                    red={userCurrency === key}
                    onClick={event => {
                      event.preventDefault();
                      setUserCurrency(key);
                    }}
                  >
                    {key.toUpperCase()} {CURRENCY.SYMBOL[key]}
                  </NavLink>
                </SubNavItem>
              ))}
            </SubNav>
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
                    return `${priciest.price} ${priciestData.brand} ${priciestData.make} ${priciestData.iso}`;
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
                    return `${cheapest.price} ${cheapestData.brand} ${cheapestData.make} ${cheapestData.iso}`;
                  })()}
                  .
                </span>
              </li>
              <li>&nbsp;</li>
              <li>
                Stores surveyed:{" "}
                <span>
                  Analogue Wonderland, Buy Film Canada, Film Photography
                  Project, Adorama, BH Photo, Freestyle Photo, Macodirect, and
                  Walmart.
                </span>
              </li>
              <li>
                Last updated: <span>Jan 1, 2020.</span>
              </li>
            </HeaderStats>

            <div style={{ display: filmSearchTerm === "" ? "block" : "none" }}>
              <h3>About this app.</h3>
              <p>
                <strong>How much should 35mm film cost?</strong> Shopping for
                new film can be challenging. Especially if it’s something new
                and you are looking to get a good deal. Sticker prices for fresh
                stock can range anywhere between two and hundred dollars per
                roll. And there’re plenty of choices to get lost in.
              </p>
            </div>
            {FILM_PRICE_DATA.map((item, iterable) => {
              // search engine
              if (filmSearchTerm) {
                const searchTerms = filmSearchTerm.toUpperCase().split(" ");
                let points = 0;
                searchTerms.forEach(term => {
                  if (
                    term !== "" &&
                    (item.brand.toUpperCase().includes(term) ||
                      item.make.toUpperCase().includes(term))
                  )
                    points++;
                });
                if (!points) return;
              }

              const previousPrice =
                item.price[1].avg.cad * CURRENCY.EXCHANGE[userCurrency];
              const currentPrice =
                item.price[0].avg.cad * CURRENCY.EXCHANGE[userCurrency];
              const priceShift = roundToCents(currentPrice - previousPrice);
              return (
                <details key={iterable}>
                  <Summary>
                    <h3>
                      {item.brand + " " + item.make + " " + item.iso} <Info />
                    </h3>
                    <Label inverse>
                      {userCurrency.toUpperCase()}{" "}
                      {CURRENCY.SYMBOL[userCurrency]}
                      {roundCurrency(
                        currentPrice,
                        userCurrency
                      ).toLocaleString()}
                    </Label>
                    <Label blue>
                      {priceShift > 0 && "+"}
                      {priceShift}
                    </Label>
                    {Object.keys(CURRENCY.SYMBOL)
                      .filter(key => key !== userCurrency)
                      .map(key => {
                        const priceCad = item.price[0].avg.cad;
                        const exchange = CURRENCY.EXCHANGE[key];
                        const value = roundCurrency(exchange * priceCad, key);

                        return (
                          <Label style={{ display: "inline-block" }}>
                            {key.toUpperCase()} {CURRENCY.SYMBOL[key]}
                            {value.toLocaleString()}
                          </Label>
                        );
                      })}
                  </Summary>
                  <p>{item.description}</p>
                  {item.posters &&
                    item.posters.map(poster => <Figure feature src={poster} />)}
                </details>
              );
            })}
          </ArticleSection>
        </ArticleWrapper>
      </Main>
    </>
  );
};

export default About;
