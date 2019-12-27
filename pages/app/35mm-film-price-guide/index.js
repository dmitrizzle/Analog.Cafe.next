import { NextSeo, ArticleJsonLd } from "next-seo";
import { connect } from "react-redux";
import React, { useState } from "react";
import Router, { withRouter } from "next/router";

import { FILM_PRICE_DATA, CURRENCY } from "./constants";
import { NavLink } from "../../../core/components/controls/Nav/components/NavLinks";
import { c_grey_dark } from "../../../constants/styles/colors";
import {
  filmPriceStats,
  generateAnchor,
  roundCurrency,
  roundToCents,
} from "./utils";
import { getPictureInfo } from "../../../core/store/actions-picture";
import AboutThisApp from "./components/AboutThisApp";
import ArticleSection from "../../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../../core/components/pages/Article/components/ArticleWrapper";
import Figure from "../../../core/components/vignettes/Picture/components/Figure";
import HeaderLarge from "../../../core/components/vignettes/HeaderLarge";
import HeaderStats from "./components/HeaderStats";
import Info from "./components/Info";
import Label from "../../../core/components/vignettes/Label";
import Link from "../../../core/components/controls/Link";
import Main from "../../../core/components/layouts/Main";
import SearchFilm from "./components/SearchFilm";
import SubNav, {
  SubNavItem,
} from "../../../core/components/controls/Nav/SubNav";
import Summary from "./components/Summary";
import ga from "../../../utils/data/ga";

const AppPriceGuide = props => {
  const [userCurrency, setUserCurrency] = useState("cad");
  const [filmSearchTerm, setFilmSearchTerm] = useState("");

  // auto-scroll
  if (props.router.query.film && typeof document !== "undefined") {
    window.requestAnimationFrame(() =>
      document.getElementById(props.router.query.film).scrollIntoView({
        block: "start",
        behavior: "smooth",
      })
    );
  }

  return (
    <>
      <NextSeo
        // title={seo.title}
        // description={seo.description}
        openGraph={{
          type: "website",
          // images: [{url: seo.images}],
          // publishedTime: new Date(props.article.date.published * 1000),
          // modifiedTime: new D0ate(props.article.date.published * 1000),
        }}
      />
      <ArticleJsonLd
      // url={seo.canonical}
      // title={seo.title}
      // description={seo.description}
      // images={[seo.image]}
      // datePublished={seo.published}
      // dateModified={seo.modified}
      // authorName={seo.submittedBy}
      // publisherName={NAME}
      // publisherLogo={
      //   DOMAIN.PROTOCOL.PRODUCTION +
      //   DOMAIN.APP.PRODUCTION +
      //   "/static/logo-1764x1764.png"
      // }
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
            <SearchFilm
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
                Rolls tracked: <span>{filmPriceStats(userCurrency).count}</span>
                .
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
              <AboutThisApp />
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
                      item.make.toUpperCase().includes(term) ||
                      item.iso.includes(term))
                  )
                    points++;
                });
                if (!points) return;
              }

              const currentPrice =
                item.price[0].avg.cad * CURRENCY.EXCHANGE[userCurrency];
              const previousPrice = item.price[1]
                ? item.price[1].avg.cad * CURRENCY.EXCHANGE[userCurrency]
                : currentPrice;
              const priceShift = roundToCents(currentPrice - previousPrice);
              const anchor = generateAnchor(item.brand, item.make, item.iso);

              return (
                <details
                  key={iterable}
                  open={props.router.query.film === anchor}
                >
                  <Summary
                    onClick={() => {
                      Router.push({
                        pathname: "/app/35mm-film-price-guide",
                        query: { film: anchor },
                      });
                    }}
                  >
                    <Link
                      onClick={event => {
                        event.preventDefault();
                      }}
                      to={"/app/35mm-film-price-guide" + "?film=" + anchor}
                    >
                      <h3 id={anchor}>
                        {item.brand + " " + item.make + " " + item.iso}{" "}
                        {item.isDead && "⚠︎"} <Info />
                      </h3>
                    </Link>
                    <Label inverse>
                      {userCurrency.toUpperCase()}{" "}
                      {CURRENCY.SYMBOL[userCurrency]}
                      {roundCurrency(
                        currentPrice,
                        userCurrency
                      ).toLocaleString()}
                    </Label>
                    {priceShift ? (
                      <Label blue>
                        {priceShift > 0 && "+"}
                        {priceShift}
                      </Label>
                    ) : null}
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
                  {item.isDead && (
                    <p>
                      <strong>
                        ⚠︎ <em>Note:</em>
                      </strong>{" "}
                      <em>This film has been discountinued.</em>
                    </p>
                  )}
                  {item.posters &&
                    item.posters.map((poster, iterable) => (
                      <Figure
                        onClick={event => {
                          props.getPictureInfo(poster);
                          ga("event", {
                            category: "Navigation",
                            action: "Picture.get_author",
                            label: poster,
                          });
                        }}
                        feature
                        style={{ marginTop: iterable > 0 ? 0 : undefined }}
                        src={poster}
                        alt={item.brand + " " + item.make + " " + item.iso}
                      />
                    ))}
                </details>
              );
            })}
          </ArticleSection>
        </ArticleWrapper>
      </Main>
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    getPictureInfo: src => {
      dispatch(getPictureInfo(src));
    },
  };
};
export default withRouter(connect(null, mapDispatchToProps)(AppPriceGuide));
