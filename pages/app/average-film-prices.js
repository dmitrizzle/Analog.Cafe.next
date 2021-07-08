import { NextSeo, ArticleJsonLd } from "next-seo";
import { css } from "styled-components";
import { useDispatch } from "react-redux";
import LazyLoad from "react-lazyload";
import React, { useState, useEffect } from "react";
import Router, { withRouter } from "next/router";
import dynamic from "next/dynamic";
import throttle from "lodash.throttle";

import { API, DOMAIN } from "../../constants/router/defaults";
import { CURRENCY } from "../../constants/currency";
import {
  DATA_SOURCES,
  DATE,
  DONOR_ARTICLE,
  FILM_PRICE_DATA,
  routes,
  seo,
} from "../../apps/average-film-prices/constants";
import { FigureWrapper } from "../../core/components/vignettes/Picture/components/Figure";
import { NAME } from "../../constants/messages/system";
import { NavLink } from "../../core/components/controls/Nav/components/NavLinks";
import { dateFromUnix } from "../../utils/time";
import {
  fetchArticlePage,
  initArticlePage,
} from "../../core/store/actions-article";
import {
  filmPriceStats,
  generateAnchor,
  roundCurrency,
  roundToCents,
} from "../../apps/average-film-prices/utils";
import { getPictureInfo } from "../../core/store/actions-picture";
import { shareModal } from "../../utils/share-modal";
import { withRedux } from "../../utils/with-redux";
import AboutThisApp from "../../apps/average-film-prices/components/AboutThisApp";
import AppHeader from "../../apps/average-film-prices/components/AppHeader";
import ArticleSection from "../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import Graph from "../../apps/average-film-prices/components/Graph";
import HeaderLarge from "../../core/components/vignettes/HeaderLarge";
import HeaderStats from "../../apps/average-film-prices/components/HeaderStats";
import ImageSet from "../../core/components/vignettes/Picture/components/ImageSet";
import Label from "../../core/components/vignettes/Label";
import Link from "../../core/components/controls/Link";
import Main from "../../core/components/layouts/Main";
import Modal from "../../core/components/controls/Modal";
import SearchFilm from "../../apps/average-film-prices/components/SearchFilm";
import SubNav, { SubNavItem } from "../../core/components/controls/Nav/SubNav";
import SubscribeToPriceGuideUpdates, {
  subscriptionReferral,
} from "../../apps/average-film-prices/components/SubscribeToPriceGuideUpdates";
import Summary from "../../apps/average-film-prices/components/Summary";
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
          url: seo.canonical,
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
        <ArticleWrapper>
          <HeaderLarge
            pageTitle={seo.title}
            pageSubtitle={`Find and Track Average Film Prices for ${
              filmPriceStats().count
            } Popular Stocks`}
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
            <FigureWrapper
              feature
              style={{
                zIndex: 12,
                height: filmSearchTerm === "" ? "inherit" : "16em",
                cursor: "default",
              }}
            >
              <ImageSet src="image-froth_1502630_qLsoYQH6K" protected />
              <AppHeader style={{ top: filmSearchTerm === "" ? "" : "4em" }}>
                <SearchFilm
                  autoFocus
                  placeholder={"Search film brands…"}
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
            </FigureWrapper>
            <div
              style={{
                display: filmSearchTerm === "" ? "block" : "none",
              }}
            >
              <AboutThisApp />
              <SubscribeToPriceGuideUpdates />
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
                      🎞 {item.brand + " " + item.make + " " + item.iso}{" "}
                    </h3>
                    <div style={{ overflow: "hidden" }}>
                      {item.price.length > 1 && (
                        <div
                          title={`Price history chart for ${
                            item.brand + " " + item.make
                          }.`}
                          style={{ margin: "0.33em 0 0 0", float: "left" }}
                        >
                          <Graph
                            data={item.price.map(price => {
                              return {
                                avg: price.avg.cad,
                                date: price.date,
                              };
                            })}
                            userCurrency={userCurrency}
                            dimensions={{ w: 90, h: 35 }}
                          />
                        </div>
                      )}
                      <div
                        style={{
                          float: "left",
                          width: "8em",
                          lineHeight: "1.25em",
                          marginTop: ".2em",
                        }}
                      >
                        <Label branded>
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
                        ) : null}{" "}
                        <Label inverse>
                          <Modal
                            href={routes.self + "#" + anchor}
                            unmarked
                            element="a"
                            noStar
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
                            share…
                          </Modal>
                        </Label>
                      </div>
                    </div>
                    <p style={{ lineHeight: "1.15em", paddingTop: "0.25em" }}>
                      <small>
                        <em>
                          <Modal
                            element="a"
                            with={{
                              info: {
                                title: "About The Data",
                                text: (
                                  <>
                                    <p>
                                      <strong>Rolls tracked:</strong>{" "}
                                      {filmPriceStats().count}.
                                    </p>
                                    <p>
                                      <strong>Stores surveyed:</strong>{" "}
                                      {DATA_SOURCES.map((source, count) => {
                                        if (count === DATA_SOURCES.length - 2)
                                          return (
                                            <React.Fragment key={count}>
                                              {source.name}, and{" "}
                                            </React.Fragment>
                                          );
                                        if (count === DATA_SOURCES.length - 1)
                                          return (
                                            <React.Fragment key={count}>
                                              {source.name}.
                                            </React.Fragment>
                                          );
                                        return (
                                          <React.Fragment key={count}>
                                            {source.name},{" "}
                                          </React.Fragment>
                                        );
                                      })}
                                    </p>
                                    <p>
                                      <strong>Last updated on:</strong>{" "}
                                      {dateFromUnix(item.price[0].date).human}
                                    </p>
                                  </>
                                ),
                                buttons: [
                                  {
                                    to: subscriptionReferral,
                                    branded: true,
                                    text: "Subscribe for Updates",
                                    onClick: () => {
                                      ga("event", {
                                        category: "nav",
                                        action: "app.35mmguide",
                                        label: subscriptionReferral,
                                      });
                                    },
                                  },
                                ],
                              },
                              id: "help/price-average",
                            }}
                          >
                            {item.isDead ? "The last known" : "Today’s"} average
                          </Modal>{" "}
                          price of a single roll of 35mm (36 exp.){" "}
                          {item.brand + " " + item.make + " " + item.iso} in{" "}
                          {userCurrency.toUpperCase()} is{" "}
                          {CURRENCY.SYMBOL[userCurrency]}
                          {roundCurrency(
                            currentPrice,
                            userCurrency
                          ).toLocaleString()}
                          . It{" "}
                          <strong>
                            {priceShift > 0 ? "went up" : "got cheaper"} by $
                            {Math.abs(priceShift)}
                          </strong>{" "}
                          since{" "}
                          {
                            dateFromUnix(item.price[item.price.length - 2].date)
                              .human
                          }
                          .
                          {item.isDead && (
                            <>
                              {" "}
                              Unfortunately, this film has been{" "}
                              <strong>discontinued</strong> by {item.brand}.
                            </>
                          )}{" "}
                          <u>Film samples and overview</u>
                        </em>{" "}
                        ⤵️
                      </small>
                    </p>
                  </Summary>

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
                  {item.posters &&
                    item.posters.map((poster, iterable) => (
                      <Figure
                        key={iterable}
                        onClick={() => {
                          dispatch(
                            getPictureInfo(
                              poster,
                              item.brand + " " + item.make + " " + item.iso
                            )
                          );
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
                  <SubscribeToPriceGuideUpdates />
                </details>
              );
            })}
          </ArticleSection>
        </ArticleWrapper>
        <ArticleNav
          fixed
          article={props.article}
          coffee={coffeeForLeadAuthor}
          leadAuthorButton={leadAuthorButton}
          leadAuthor={leadAuthor}
        />
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
      url: `${API.ARTICLES}/${DONOR_ARTICLE.slug}`,
    })
  );
  const article = reduxStore.getState().article;
  return { article };
};

export default withRouter(withRedux(AppPriceGuide));
