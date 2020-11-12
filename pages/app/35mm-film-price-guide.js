import { NextSeo, ArticleJsonLd } from "next-seo";
import { css } from "styled-components";
import { useDispatch } from "react-redux";
import LazyLoad from "react-lazyload";
import React, { useState, useEffect } from "react";
import Router, { withRouter } from "next/router";
import dynamic from "next/dynamic";
import throttle from "lodash.throttle";

import { API, DOMAIN } from "../../constants/router/defaults";
import {
  CURRENCY,
  DATE,
  DONNOR_ARTICLE,
  FILM_PRICE_DATA,
  routes,
  seo,
} from "../../apps/35mm-film-price-guide/constants";
import { NAME } from "../../constants/messages/system";
import { NavLink } from "../../core/components/controls/Nav/components/NavLinks";
import {
  fetchArticlePage,
  initArticlePage,
} from "../../core/store/actions-article";
import {
  generateAnchor,
  roundCurrency,
  roundToCents,
} from "../../apps/35mm-film-price-guide/utils";
import { getPictureInfo } from "../../core/store/actions-picture";
import { shareModal } from "../../utils/share-modal";
import { withRedux } from "../../utils/with-redux";
import AboutThisApp from "../../apps/35mm-film-price-guide/components/AboutThisApp";
import AppHeader from "../../apps/35mm-film-price-guide/components/AppHeader";
import ArticleSection from "../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import Graph from "../../apps/35mm-film-price-guide/components/Graph";
import HeaderLarge from "../../core/components/vignettes/HeaderLarge";
import HeaderStats from "../../apps/35mm-film-price-guide/components/HeaderStats";
import Info from "../../apps/35mm-film-price-guide/components/Info";
import Label from "../../core/components/vignettes/Label";
import Link from "../../core/components/controls/Link";
import LinkButton from "../../core/components/controls/Button/components/LinkButton";
import Main from "../../core/components/layouts/Main";
import Modal from "../../core/components/controls/Modal";
import Point from "../../core/components/icons/Point";
import SearchFilm from "../../apps/35mm-film-price-guide/components/SearchFilm";
import Share from "../../core/components/icons/Share";
import SubNav, { SubNavItem } from "../../core/components/controls/Nav/SubNav";
import Summary from "../../apps/35mm-film-price-guide/components/Summary";
import ga from "../../utils/data/ga";

const ArticleNav = dynamic(
  () => import("../../core/components/pages/Article/components/ArticleNav"),
  {
    ssr: false,
    loading: () => <div style={{ height: "2.5em", width: "100%" }} />,
  }
);
const Figure = dynamic(
  () => import("../../core/components/vignettes/Picture/components/Figure"),
  {}
);
const ArticleFooter = dynamic(
  () => import("../../core/components/pages/Article/components/ArticleFooter"),
  {
    ssr: false,
  }
);

const AppPriceGuide = props => {
  const dispatch = useDispatch();

  const [userCurrency, setUserCurrency] = useState("cad");
  const [filmSearchTerm, setFilmSearchTerm] = useState("");
  const [hash, setHash] = useState(process.browser ? window.location.hash : "");

  useEffect(() => {
    // send article data into Redux
    if (process.browser) {
      dispatch(initArticlePage(props.article));
    }

    if (window.location.hash) {
      // auto-expand
      const element = document.getElementById(hash.replace("#", "details-"));
      if (element) element.open = true;
    }
  }, [hash]);

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
        url={seo.canonical}
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

      <Main filter={props.article.tag} title={props.article.title}>
        <ArticleNav
          article={props.article}
          coffee={coffeeForLeadAuthor}
          leadAuthorButton={leadAuthorButton}
          leadAuthor={leadAuthor}
        />
        <ArticleWrapper>
          <HeaderLarge
            pageTitle={seo.title}
            pageSubtitle={"Estimate and understand your next film purchase"}
          >
            <em
              css={css`
                display: block;
                color: ${({ theme }) => theme.grey_dark};
                line-height: 1em;
                padding-top: 0.5em;
              `}
            >
              <small>
                An app by <Link to="/u/dmitrizzle">Dmitri</Link>.
              </small>
            </em>
          </HeaderLarge>
          <ArticleSection>
            <AppHeader>
              <SearchFilm
                autoFocus
                placeholder={"Search 35mm film…"}
                setFilmSearchTerm={setFilmSearchTerm}
                onChange={event => {
                  setFilmSearchTerm(event.target.value);
                  //reset route when searching
                  throttle(() => {
                    setHash("");
                    Router.push({
                      pathname: routes.self,
                      query: {},
                    });

                    document.getElementById("search-film") &&
                      document.getElementById("search-film").scrollIntoView({
                        block: "start",
                      });
                  }, 500);
                }}
                value={filmSearchTerm}
                maxLength={300}
                id="search-film"
              />
              <SubNav style={{ justifyContent: "left", paddingLeft: 0 }}>
                {Object.keys(CURRENCY.EXCHANGE).map((key, iterable) => (
                  <SubNavItem key={iterable}>
                    <NavLink
                      opaque={1}
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
                setHash={setHash}
                userCurrency={userCurrency}
                filmSearchTerm={filmSearchTerm}
              />
            </AppHeader>

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
              const absoluteAnchorUrl =
                DOMAIN.PROTOCOL.PRODUCTION +
                DOMAIN.APP.PRODUCTION +
                routes.self +
                "#" +
                anchor;

              return (
                <details key={iterable} id={`details-${anchor}`}>
                  <Summary>
                    <h3 id={anchor}>
                      {item.brand + " " + item.make + " " + item.iso}{" "}
                      {item.isDead && "⚠︎"} <Info />
                    </h3>

                    <Label inverse>
                      {userCurrency.toUpperCase()}{" "}
                      {CURRENCY.SYMBOL[userCurrency]}
                      {roundCurrency(
                        currentPrice,
                        userCurrency
                      ).toLocaleString()}
                    </Label>
                    {priceShift ? (
                      <Label
                        blue
                        title={`This is how much the price has changed since earlier survey in ${
                          CURRENCY.SYMBOL[userCurrency]
                        }${userCurrency.toUpperCase()}.`}
                      >
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
                            key={iterable}
                            // onClick={() => setUserCurrency(key)}
                          >
                            <span style={{ display: "inline-block" }}>
                              {key.toUpperCase()} {CURRENCY.SYMBOL[key]}
                              {value.toLocaleString()}
                            </span>
                          </Label>
                        );
                      })}
                  </Summary>
                  {item.price.length > 1 && (
                    <div
                      title={`Price history chart for ${
                        item.brand + " " + item.make
                      }.`}
                      style={{ margin: ".25em 0 .5em .25em" }}
                    >
                      <Graph
                        data={item.price.map(price => {
                          return {
                            avg: price.avg.cad,
                            date: price.date,
                          };
                        })}
                        userCurrency={userCurrency}
                        dimensions={{ w: 90, h: 15 }}
                      />
                    </div>
                  )}
                  <p>{item.description}</p>
                  {item.isDead && (
                    <p>
                      <strong>
                        ⚠︎ <em>Note:</em>
                      </strong>{" "}
                      <em>
                        This film has been discountinued by the manufacturer.
                      </em>
                    </p>
                  )}

                  <p style={{ textAlign: "center" }}>
                    <Link
                      to="#search-film"
                      onClick={event => {
                        event.preventDefault();
                        Router.push({
                          pathname: routes.self,
                          query: {},
                        });
                        const searchField = document.getElementById(
                          "input-search-film"
                        );

                        searchField &&
                          searchField.scrollIntoView({
                            block: "start",
                          });
                        const delay = setTimeout(() => {
                          clearTimeout(delay);
                          searchField.focus();
                        }, 500);
                      }}
                      style={{ textDecoration: "none" }}
                    >
                      <Point style={{ height: "1em" }} />{" "}
                      <small>
                        <em>
                          <u>back to search</u>
                        </em>
                      </small>
                    </Link>
                    <small>
                      {" "}
                      ・{" "}
                      <em>
                        <Modal
                          href={routes.self + "#" + anchor}
                          unmarked
                          element="a"
                          with={shareModal({
                            url: absoluteAnchorUrl,
                            title:
                              "Price Guide for " +
                              item.brand +
                              " " +
                              item.make +
                              " " +
                              item.iso,
                            id: anchor,
                          })}
                        >
                          <strong>share</strong>
                        </Modal>
                      </em>{" "}
                      <Share style={{ height: "1em" }} />
                    </small>
                  </p>

                  {item.referral && (
                    <>
                      <LinkButton
                        to={item.referral}
                        onClick={() => {
                          ga("event", {
                            category: "nav",
                            action: "app.35mmguide",
                            label: item.referral,
                          });
                        }}
                        branded
                      >
                        Get Price Alerts
                      </LinkButton>
                      {item.referralShopName && (
                        <p
                          style={{
                            textAlign: "center",
                            marginTop: "0em",
                            lineHeight: "1.15em",
                          }}
                        >
                          <small>
                            <Link
                              to={item.referral}
                              onClick={() => {
                                ga("event", {
                                  category: "nav",
                                  action: "app.35mmguide",
                                  label: item.referral,
                                });
                              }}
                              branded
                            >
                              Subscribe
                            </Link>{" "}
                            to{" "}
                            <strong>
                              <em>“35mm Film — Price Alerts”</em>
                            </strong>{" "}
                            emails to get notified whenever the film prices
                            change.
                          </small>
                        </p>
                      )}
                    </>
                  )}

                  {item.posters &&
                    item.posters.map((poster, iterable) => (
                      <Figure
                        key={iterable}
                        onClick={() => {
                          dispatch(getPictureInfo(poster));
                          ga("event", {
                            category: "nav",
                            action: "picture.modal",
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

export default withRouter(withRedux(AppPriceGuide));
