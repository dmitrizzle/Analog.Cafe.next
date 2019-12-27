import { NextSeo, ArticleJsonLd } from "next-seo";
import { connect } from "react-redux";
import LazyLoad from "react-lazyload";
import React, { useState } from "react";
import Router, { withRouter } from "next/router";

import { API, DOMAIN } from "../../../constants/router/defaults";
import {
  CURRENCY,
  DATE,
  DONNOR_ARTICLE,
  FILM_PRICE_DATA,
  routes,
  seo,
} from "./constants";
import { NAME } from "../../../constants/messages/system";
import { NavLink } from "../../../core/components/controls/Nav/components/NavLinks";
import { c_grey_dark } from "../../../constants/styles/colors";
import { fetchArticlePage } from "../../../core/store/actions-article";
import { generateAnchor, roundCurrency, roundToCents } from "./utils";
import { getPictureInfo } from "../../../core/store/actions-picture";
import AboutThisApp from "./components/AboutThisApp";
import ArticleFooter from "../../../core/components/pages/Article/components/ArticleFooter";
import ArticleNav from "../../../core/components/pages/Article/components/ArticleNav";
import ArticleSection from "../../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../../core/components/pages/Article/components/ArticleWrapper";
import Figure from "../../../core/components/vignettes/Picture/components/Figure";
import HeaderLarge from "../../../core/components/vignettes/HeaderLarge";
import HeaderStats from "./components/HeaderStats";
import Info from "./components/Info";
import Label from "../../../core/components/vignettes/Label";
import Link from "../../../core/components/controls/Link";
import Main from "../../../core/components/layouts/Main";
import Point from "../../../core/components/icons/Point";
import SearchFilm from "./components/SearchFilm";
import SubNav, {
  SubNavItem,
} from "../../../core/components/controls/Nav/SubNav";
import Summary from "./components/Summary";
import document from "../../_document";
import ga from "../../../utils/data/ga";

const AppPriceGuide = props => {
  const [userCurrency, setUserCurrency] = useState("cad");
  const [filmSearchTerm, setFilmSearchTerm] = useState("");

  // auto-scroll
  if (
    props.router.query.film &&
    typeof document !== "undefined" &&
    typeof window !== "undefined"
  ) {
    window.requestAnimationFrame(
      () =>
        document.getElementById(props.router.query.film) &&
        document.getElementById(props.router.query.film).scrollIntoView({
          block: "start",
          behavior: "smooth",
        })
    );
  }

  const leadAuthor = props.article.authors
    ? props.article.authors.filter(author => author.authorship === "article")[0]
    : {};
  const leadAuthorButton = leadAuthor.buttons
    ? leadAuthor.buttons[1]
    : { text: "" };
  const coffeeForLeadAuthor = leadAuthorButton.text.includes("Coffee");

  return (
    <>
      <NextSeo
        title={seo.title}
        description={seo.description}
        openGraph={{
          type: "website",
          images: [{ url: seo.image }],
          publishedTime: seo.published,
          modifiedTime: seo.modified,
        }}
      />
      <ArticleJsonLd
        url={
          seo.canonical + props.router.query.film
            ? "?film=" + props.router.query.film
            : ""
        }
        title={seo.title}
        description={seo.description}
        images={[seo.image]}
        datePublished={seo.published}
        dateModified={seo.modified}
        authorName={"Dmitri"}
        publisherName={NAME}
        publisherLogo={
          DOMAIN.PROTOCOL.PRODUCTION +
          DOMAIN.APP.PRODUCTION +
          "/static/logo-1764x1764.png"
        }
      />

      <Main>
        <ArticleNav
          article={props.article}
          coffee={coffeeForLeadAuthor}
          leadAuthorButton={leadAuthorButton}
          leadAuthor={leadAuthor}
          fixed
        />
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
              setFilmSearchTerm={setFilmSearchTerm}
              onChange={event => {
                setFilmSearchTerm(event.target.value);
                if (props.router.query.film) {
                  // reset route when searching
                  Router.push({
                    pathname: routes.self,
                    query: {},
                  });
                  document.getElementById("search-film").scrollIntoView({
                    block: "start",
                    behavior: "smooth",
                  });
                }
              }}
              value={filmSearchTerm}
              maxLength={300}
              id="search-film"
            />
            <SubNav style={{ justifyContent: "left", paddingLeft: 0 }}>
              {Object.keys(CURRENCY.EXCHANGE).map((key, iterable) => (
                <SubNavItem key={iterable}>
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
            <HeaderStats
              userCurrency={userCurrency}
              filmSearchTerm={filmSearchTerm}
            />

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
                        pathname: routes.self,
                        query: { film: anchor },
                      });
                    }}
                  >
                    <Link
                      onClick={event => {
                        event.preventDefault();
                      }}
                      to={routes.self + "?film=" + anchor}
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
                      .map((key, iterable) => {
                        const priceCad = item.price[0].avg.cad;
                        const exchange = CURRENCY.EXCHANGE[key];
                        const value = roundCurrency(exchange * priceCad, key);

                        return (
                          <Label
                            style={{ display: "inline-block" }}
                            key={iterable}
                          >
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

                  <p>
                    <Link
                      to="#search-film"
                      onClick={event => {
                        event.preventDefault();
                        Router.push({
                          pathname: routes.self,
                          query: {},
                        });
                        document.getElementById("search-film").scrollIntoView({
                          block: "start",
                          behavior: "smooth",
                        });
                      }}
                      style={{ textDecoration: "none" }}
                    >
                      <Point style={{ height: "1em" }} />{" "}
                      <small>
                        <em>
                          <u>scroll up</u>.
                        </em>
                      </small>
                    </Link>
                  </p>
                  {item.posters &&
                    item.posters.map((poster, iterable) => (
                      <Figure
                        key={iterable}
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

            <LazyLoad once offset={300} height={"100%"}>
              <ArticleFooter
                leadAuthorButton={leadAuthorButton}
                leadAuthor={leadAuthor}
                coffeeForLeadAuthor
                article={props.article}
                thisArticlePostDate={DATE.published}
                thisArticleEditDate={DATE.modified}
              />
            </LazyLoad>
          </ArticleSection>
        </ArticleWrapper>
      </Main>
    </>
  );
};

AppPriceGuide.getInitialProps = async ({ reduxStore }) => {
  await reduxStore.dispatch(
    fetchArticlePage({
      url: `${API.ARTICLES}/${DONNOR_ARTICLE.slug}`,
    })
  );
  const article = reduxStore.getState().article;
  return { article };
};

const mapDispatchToProps = dispatch => {
  return {
    getPictureInfo: src => {
      dispatch(getPictureInfo(src));
    },
  };
};

export default withRouter(connect(null, mapDispatchToProps)(AppPriceGuide));
