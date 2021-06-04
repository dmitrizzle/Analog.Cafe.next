import { NextSeo } from "next-seo";
import React from "react";
import styled from "styled-components";

import { API } from "../constants/router/defaults";
import { CURRENCY } from "../constants/currency";
import { ColumnWrapper } from "../core/components/pages/Article/components/ArticleCardColumns";
import { b_mobile } from "../constants/styles/measurements";
import { makeFroth } from "../utils/froth";
import { responseCache } from "../utils/storage/ls-cache";
import ArticleSection from "../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../core/components/pages/Article/components/ArticleWrapper";
import Button from "../core/components/controls/Button";
import CardCaption from "../core/components/controls/Card/components/CardCaption";
import CardIntegrated from "../core/components/controls/Card/components/CardIntegrated";
import HeaderLarge from "../core/components/vignettes/HeaderLarge";
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
      <Main title={seo.title}>
        <ArticleWrapper>
          <HeaderLarge pageTitle={seo.title} />

          <ArticleSection>
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
                >
                  <ShopCard withOutline>
                    <figure
                      style={{
                        backgroundImage: `url(${item.images[0].url})`,
                      }}
                    />
                    <ShopCardCaption>
                      <h4>{item.title}</h4>
                    </ShopCardCaption>
                    <Button
                      onClick={event => {}}
                      branded
                      style={{ fontSize: "1em" }}
                    >
                      ${item.price.usd} on Etsy
                    </Button>
                  </ShopCard>
                </Link>
              ))}
            </ColumnWrapper>
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

export default Shop;
