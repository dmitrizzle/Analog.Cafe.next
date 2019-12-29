import { NextSeo, ArticleJsonLd } from "next-seo";
import { connect } from "react-redux";
import LazyLoad from "react-lazyload";
import React, { useState, useEffect } from "react";
import Router, { withRouter } from "next/router";

import { API, DOMAIN } from "../../../constants/router/defaults";
import {
  CURRENCY,
  DATE,
  DONNOR_ARTICLE,
  FILM_PRICE_DATA,
  routes,
  seo,
} from "../../../apps/35mm-film-price-guide/constants";
import { NAME } from "../../../constants/messages/system";
import { NavLink } from "../../../core/components/controls/Nav/components/NavLinks";
import {
  c_grey_dark,
  c_grey_med,
  c_white,
} from "../../../constants/styles/colors";
import { fetchArticlePage } from "../../../core/store/actions-article";
import {
  generateAnchor,
  roundCurrency,
  roundToCents,
} from "../../../apps/35mm-film-price-guide/utils";
import { getPictureInfo } from "../../../core/store/actions-picture";
import AboutThisApp from "../../../apps/35mm-film-price-guide/components/AboutThisApp";
import ArticleFooter from "../../../core/components/pages/Article/components/ArticleFooter";
import ArticleNav from "../../../core/components/pages/Article/components/ArticleNav";
import ArticleSection from "../../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../../core/components/pages/Article/components/ArticleWrapper";
import Figure from "../../../core/components/vignettes/Picture/components/Figure";
import HeaderLarge from "../../../core/components/vignettes/HeaderLarge";
import HeaderStats from "../../../apps/35mm-film-price-guide/components/HeaderStats";
import Info from "../../../apps/35mm-film-price-guide/components/Info";
import Label from "../../../core/components/vignettes/Label";
import Link from "../../../core/components/controls/Link";
import Main from "../../../core/components/layouts/Main";
import Modal from "../../../core/components/controls/Modal";
import Point from "../../../core/components/icons/Point";
import SearchFilm from "../../../apps/35mm-film-price-guide/components/SearchFilm";
import Share from "../../../core/components/icons/Share";
import SubNav, {
  SubNavItem,
} from "../../../core/components/controls/Nav/SubNav";
import Summary from "../../../apps/35mm-film-price-guide/components/Summary";
import ga from "../../../utils/data/ga";

const AppPriceGuide = props => {
  const [userCurrency, setUserCurrency] = useState("cad");
  const [filmSearchTerm, setFilmSearchTerm] = useState("");
  const [hash, setHash] = useState(
    typeof window !== "undefined" ? window.location.hash : ""
  );

  useEffect(() => {
    // in case someone attempts to access heading id as hash
    if (hash.includes("heading-")) {
      const fixedHash = hash.replace("heading-", "");
      window.location.hash = fixedHash;
      setHash(fixedHash);
    }

    window.location.hash &&
      window.requestAnimationFrame(() => {
        // auto-scroll
        let element = document.getElementById(hash.replace("#", "heading-"));
        element &&
          element.scrollIntoView({
            block: "start",
            behavior: "smooth",
          });

        // auto-expand
        element = document.getElementById(hash.replace("#", "details-"));
        if (element) element.open = true;
      });
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
            pageTitle={seo.title}
            pageSubtitle={"Estimate and understand your next film purchase"}
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
            <div
              style={{
                zIndex: 11,
                position: "relative",
                background: "rgba(255, 255, 255, 0.85)",
                backdropFilter: "blur(3px)",
                borderBottom: `1px solid ${c_grey_med}`,
              }}
            >
              <SearchFilm
                autoFocus
                placeholder={"Search 35mm film…"}
                setFilmSearchTerm={setFilmSearchTerm}
                onChange={event => {
                  setFilmSearchTerm(event.target.value);
                  //reset route when searching
                  setHash("");
                  Router.push({
                    pathname: routes.self,
                    query: {},
                  });

                  document.getElementById("search-film") &&
                    document.getElementById("search-film").scrollIntoView({
                      block: "start",
                      behavior: "smooth",
                    });
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
                setHash={setHash}
                userCurrency={userCurrency}
                filmSearchTerm={filmSearchTerm}
              />
            </div>

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
                  <Summary
                    onClick={event => {
                      event.preventDefault();
                      hash !== "#" + anchor && setHash("#" + anchor);
                      window.location.hash = "#" + anchor;

                      const el = document.getElementById("details-" + anchor);
                      el.open = !el.open;
                    }}
                  >
                    <Link
                      onClick={event => {
                        event.preventDefault();
                      }}
                      to={routes.self + "#" + anchor}
                    >
                      <h3 id={"heading-" + anchor}>
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
                      <Label
                        blue
                        title="This is how much the price has changed since earlier survey."
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

                  <p>
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
                            behavior: "smooth",
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
                          unmarked
                          element="a"
                          with={{
                            info: {
                              title:
                                "Price Guide for " +
                                item.brand +
                                " " +
                                item.make +
                                " " +
                                item.iso,
                              text: (
                                <>
                                  <span style={{ userSelect: "none" }}>
                                    Link URL:{" "}
                                  </span>
                                  <strong>{absoluteAnchorUrl}</strong>
                                </>
                              ),
                              buttons: [
                                {
                                  to: absoluteAnchorUrl,
                                  onClick: event => {
                                    event.preventDefault();
                                    const el = document.createElement(
                                      "textarea"
                                    );
                                    el.value = absoluteAnchorUrl;
                                    document.body.appendChild(el);
                                    el.select();
                                    document.execCommand("copy");
                                    document.body.removeChild(el);
                                  },
                                  text: "Copy Link",
                                },
                                {
                                  to:
                                    "https://twitter.com/intent/tweet?text=" +
                                    encodeURIComponent(
                                      `${item.brand +
                                        " " +
                                        item.make +
                                        " " +
                                        item.iso} – ${
                                        seo.title
                                      } ${absoluteAnchorUrl}`
                                    ),
                                  text: "Share on Twitter",
                                },
                                {
                                  to:
                                    "https://www.facebook.com/sharer/sharer.php?u=" +
                                    encodeURIComponent(absoluteAnchorUrl),
                                  text: "Share on Facebook",
                                },
                              ],
                            },
                            id: "share/" + anchor,
                          }}
                        >
                          <strong>share</strong>
                        </Modal>
                      </em>{" "}
                      <Share style={{ height: "1em" }} />
                    </small>
                  </p>
                  {item.posters &&
                    item.posters.map((poster, iterable) => (
                      <Figure
                        key={iterable}
                        onClick={() => {
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
