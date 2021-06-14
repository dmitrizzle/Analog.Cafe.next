import { NextSeo } from "next-seo";
import { useSelector } from "react-redux";
import React from "react";
import lscache from "lscache";
import styled from "styled-components";

import { API, DOMAIN } from "../constants/router/defaults";
import { ColumnWrapper } from "../core/components/pages/Article/components/ArticleCardColumns";
import { b_mobile } from "../constants/styles/measurements";
import { makeFroth } from "../utils/froth";
import { responseCache } from "../utils/storage/ls-cache";
import { withRedux } from "../utils/with-redux";
import ArticleSection from "../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../core/components/pages/Article/components/ArticleWrapper";
import Button from "../core/components/controls/Button";
import CardCaption from "../core/components/controls/Card/components/CardCaption";
import CardIntegrated from "../core/components/controls/Card/components/CardIntegrated";
import HeaderLarge from "../core/components/vignettes/HeaderLarge";
import Label from "../core/components/vignettes/Label";
import Link from "../core/components/controls/Link";
import Main from "../core/components/layouts/Main";
import ga from "../utils/data/ga";
import puppy from "../utils/puppy";

const etsyApiRequest = {
  url: API.ETSY,
  method: "get",
};
const seo = {
  title: "Shop",
  description: "Shop print products, film, cameras, and more.",
  images: [
    {
      url: makeFroth({ src: "image-froth_1502065_MloqLes--", size: "l" }).src,
    },
  ],
};

const ShopCard = styled(CardIntegrated)`
  figure {
    height: ${b_mobile};
    margin-bottom: 1px;
    background-size: cover !important;
    background-position: center;
  }
  label {
    position: absolute;
    top: 0.5em;
    right: 0.5em;
  }
`;
const ShopCardCaption = styled(CardCaption)`
  height: 6em;
  h4 {
    font-size: 1.25em;
    padding-bottom: 2px;
    font-style: normal;

    display: block;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`;

const Shop = ({ etsyListings }) => {
  const { status } = useSelector(state => state.user);
  const clearStoreCache = async event => {
    event.preventDefault();
    const response = await puppy({
      url: API.ETSY_CACHE,
      method: "DELETE",
      headers: {
        Authorization: "JWT " + lscache.get("token"),
        "Content-Type": "application/json",
      },
    });
    console.log(await response.json());
  };

  return (
    <>
      <NextSeo
        title={seo.title}
        description={seo.description}
        openGraph={{
          type: "website",
          images: seo.images,
          url: DOMAIN.PROTOCOL.PRODUCTION + DOMAIN.APP.PRODUCTION + "/shop",
        }}
      />
      <Main title={seo.title}>
        <ArticleWrapper>
          <HeaderLarge pageTitle={seo.title} />

          <ArticleSection>
            <p>
              <em>
                Inspected, repaired, and film-tested cameras. Hand-made
                books/zines, and accessories.{" "}
                <span style={{ display: "inline-block" }}>
                  Carbon-offset shipping from{" "}
                  <span style={{ display: "inline-block" }}>
                    Canada
                    <span style={{ fontStyle: "normal" }}>🇨🇦</span>
                    <span style={{ fontStyle: "normal" }}>🌳</span>
                  </span>{" "}
                  <span style={{ display: "inline-block" }}>
                    via{" "}
                    <strong>
                      <Link
                        to="https://www.etsy.com/impact"
                        onClick={() => {
                          ga("event", {
                            category: "out",
                            action: "shop.link",
                            label: "CarbonOffset.Etsy",
                          });
                        }}
                      >
                        Etsy
                      </Link>
                    </strong>
                    .
                  </span>
                </span>
              </em>
            </p>
            <p style={{ textAlign: "center" }}>
              <small style={{ opacity: 0.75 }}>All prices in USD.</small>
            </p>
            <ColumnWrapper>
              {etsyListings.map(item => (
                <Link
                  key={item.id}
                  to={item.url}
                  onClick={() =>
                    ga("event", {
                      category: "out",
                      action: "shop.link",
                      label: item.title,
                    })
                  }
                  style={{ textDecoration: "none" }}
                  title="View and purchase on Etsy"
                >
                  <ShopCard withOutline>
                    <figure
                      style={{
                        backgroundImage: `url(${item.images[0]?.url})`,
                      }}
                    />
                    <ShopCardCaption>
                      <h4>{item.title}</h4>
                    </ShopCardCaption>
                    {item.shipping?.isFree && (
                      <Label green>FREE Shipping!</Label>
                    )}
                    {item.isInhouseProduction && (
                      <Label blue style={{ left: ".5em", right: "initial" }}>
                        🖐 Hand-Made
                      </Label>
                    )}
                    <Button
                      onClick={() => {}}
                      branded
                      style={{ fontSize: "1em" }}
                    >
                      ${item.price?.usd}
                    </Button>
                  </ShopCard>
                </Link>
              ))}
            </ColumnWrapper>
            {status === "ok" && (
              <Button style={{ fontSize: "1em" }} onClick={clearStoreCache}>
                Clear Store API Cache
              </Button>
            )}
          </ArticleSection>
        </ArticleWrapper>
      </Main>
    </>
  );
};

Shop.getInitialProps = async ({ req }) => {
  // return cache instead of fetching, if available
  const cache = responseCache.get(etsyApiRequest);
  if (process.browser && cache) return { etsyListings: cache };

  return puppy(etsyApiRequest)
    .then(r => r.json())
    .then(response => {
      if (response.status === "ok") {
        // set cache when comping from another part of the app
        responseCache.set(etsyApiRequest, response.listings);
        return { etsyListings: response.listings };
      }
      return { etsyListings: [], isSsr: !!req };
    })
    .catch(error => {
      console.log(error);
      return { etsyListings: [], isSsr: !!req };
    });
};

export default withRedux(Shop);
