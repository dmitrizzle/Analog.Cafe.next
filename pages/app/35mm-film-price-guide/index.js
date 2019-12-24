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
import { c_red, c_grey_dark, c_yellow } from "../../../constants/styles/colors";
import { seo, FILM_PRICE_DATA, CURRENCY } from "./constants";

const Summary = styled.summary`
  ::-webkit-details-marker {
    display: none;
  }
  cursor: pointer;
  outline: none;
`;

const roundToCents = n => Math.round(n * 100) / 100;
const roundCurrency = (value, currency) => {
  return currency === "jpy" || currency === "thb"
    ? Math.round(value)
    : roundToCents(value);
};

const About = props => {
  const [userCurrency, setUserCurrency] = useState("cad");

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
            <h3>Select your currency:</h3>
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
            <h3>Find your film:</h3>
            <h3>About this app.</h3>
            <p>
              <strong>How much should 35mm film cost?</strong> Shopping for new
              film can be challenging. Especially if it’s something new and you
              are looking to get a good deal. Sticker prices for fresh stock can
              range anywhere between two and hundred dollars per roll. And
              there’re plenty of choices to get lost in.
            </p>
            {FILM_PRICE_DATA.map((item, iterable) => {
              const previousPrice =
                item.price[1].avg.cad * CURRENCY.EXCHANGE[userCurrency];
              const currentPrice =
                item.price[0].avg.cad * CURRENCY.EXCHANGE[userCurrency];
              const priceShift = roundToCents(currentPrice - previousPrice);
              return (
                <details key={iterable}>
                  <Summary>
                    <h3>{item.brand + " " + item.make + " " + item.iso}</h3>
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
