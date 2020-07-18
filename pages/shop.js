import { NextSeo } from "next-seo";
import { useSelector } from "react-redux";
import LazyLoad from "react-lazyload";
import React, { useState } from "react";
import styled, { css } from "styled-components";

import { API } from "../constants/router/defaults";
import { CARD_COMMUNITY_REFERRAL } from "../constants/messages/affiliate";
import { bleed } from "../core/components/vignettes/Picture/components/Figure";
import { c_red } from "../constants/styles/themes";
import { makeFroth } from "../utils/froth";
import { responseCache } from "../utils/storage/ls-cache";
import { withRedux } from "../utils/with-redux";
import ArticleSection from "../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../core/components/pages/Article/components/ArticleWrapper";
import HeaderLarge from "../core/components/vignettes/HeaderLarge";
import Link from "../core/components/controls/Link";
import LinkButton from "../core/components/controls/Button/components/LinkButton";
import Main from "../core/components/layouts/Main";
import Modal from "../core/components/controls/Modal";
import Present from "../core/components/icons/Present";
import PriceTag from "../core/components/icons/PriceTag";
import ga from "../utils/data/ga";
import puppy from "../utils/puppy";

const request = {
  url: API.ADS,
  method: "get",
  params: {
    location: "shop",
  },
};

const Deals = styled.p`
  min-height: 1.5em;
  line-height: 1.25em;
  font-size: 0.8em;

  svg {
    width: 1em;
    display: block;
    margin: 0.25em 0.5em 0 -1.5em;
    float: left;
    fill: ${c_red};
  }
`;
const Details = styled.p`
  font-size: 0.8em;
  font-style: italic;
  text-align: center;
  > span {
    color: ${({ theme }) => theme.grey_dark};
    display: inline-block;
  }
`;
const ItemHeader = styled.h3`
  padding-top: ${props => {
    return props.iterable > 0 ? "3em !important" : "2em !important";
  }};
  svg {
    width: 0.45em;
    display: block;
    margin: 0.33em 0 0 -0.65em;
    float: left;
    fill: ${c_red};
  }
`;
const PosterWrapper = styled.div`
  ${bleed};
  height: 18em;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  ::-webkit-scrollbar {
    display: none;
  }
  margin-top: 3em;
  text-align: center;
`;

const Shop = props => {
  const seo = {
    title: "Shop",
    description:
      "Shop magazines, film, cameras, and more hand-picked items selected by Analog.Cafe magazine editors.",
    images: [
      {
        url: makeFroth({ src: "image-froth_4000000__1HY-WAi", size: "l" }).src,
      },
    ],
  };

  const { status } = useSelector(state => state.user);

  const [deals, setDeals] = useState();
  useState(() => {
    // set cache on first render or when refreshed
    const cache = responseCache.get(request);
    if (!cache || props.isSsr) responseCache.set(request, props.shopInventory);

    puppy({ ...request, params: { location: "account" } })
      .then(r => r.json())
      .then(response => {
        setDeals(response);
      })
      .catch(() => {});
  }, [deals]);

  const { items } = props.shopInventory;

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
          <HeaderLarge
            pageTitle={seo.title}
            pageSubtitle={"Featured products for Analog.Cafe readers"}
          />
          <ArticleSection>
            {status === "ok" ? (
              <Deals>
                <PriceTag />
                {deals?.items.map((deal, iterable) => (
                  <React.Fragment key={iterable}>
                    <strong>
                      <Link to={deal.link}>{deal.title}</Link>
                    </strong>{" "}
                    {deal.description}{" "}
                  </React.Fragment>
                ))}
              </Deals>
            ) : (
              <Deals>
                Analog.Cafe members get deals.{" "}
                <strong>
                  <Link to="/sign-in">Sign up</Link>
                </strong>{" "}
                to get yours.
              </Deals>
            )}

            <div
              css={css`
                height: 1em;
                background: ${({ theme }) => theme.fg};
                margin: 0 -1.5em;
              `}
            />

            {items.map((item, iterable) => (
              <React.Fragment key={iterable}>
                <ItemHeader iterable={iterable}>
                  <Present /> {item.title}.
                </ItemHeader>
                {item.poster &&
                  (() => {
                    const src = item.poster;
                    const frothJPEGmedium = makeFroth({ src, size: "m" });
                    return (
                      <PosterWrapper feature>
                        <picture>
                          <source
                            srcSet={
                              makeFroth({
                                src,
                                size: "m",
                                type: "webp",
                              }).src
                            }
                            media="(max-width: 320px)"
                            type="image/webp"
                          />
                          <source
                            srcSet={
                              makeFroth({
                                src,
                                size: "l",
                                type: "webp",
                              }).src
                            }
                            media="(min-width: 321px)"
                            type="image/webp"
                          />
                          <source
                            srcSet={makeFroth({ src, size: "m" }).src}
                            media="(max-width: 320px)"
                          />
                          <source
                            srcSet={makeFroth({ src, size: "l" }).src}
                            media="(min-width: 321px)"
                          />

                          <noscript>
                            <img
                              src={makeFroth({ src, size: "l" }).src}
                              alt={item.title}
                              style={{
                                height: frothJPEGmedium.ratio
                                  ? "100%"
                                  : "initial",
                              }}
                              loading="lazy"
                            />
                          </noscript>
                          <LazyLoad
                            unmountIfInvisible
                            once
                            offset={300}
                            height={"100%"}
                          >
                            <img
                              src={makeFroth({ src, size: "l" }).src}
                              alt={item.title}
                              style={{
                                height: frothJPEGmedium.ratio
                                  ? "100%"
                                  : "initial",
                              }}
                              loading="lazy"
                            />
                          </LazyLoad>
                        </picture>
                      </PosterWrapper>
                    );
                  })()}
                <p>{item.description}</p>
                <Details>
                  {item.details?.map(detail => (
                    <React.Fragment key={detail.to}>
                      <Link
                        style={{ display: "inline-block" }}
                        onClick={() => {
                          ga("event", {
                            category: "nav",
                            action: "shop",
                            label: detail.to,
                          });
                        }}
                        to={detail.to}
                      >
                        {detail.text}
                      </Link>
                      .{" "}
                    </React.Fragment>
                  ))}{" "}
                  <span>
                    Why buy from{" "}
                    <Modal
                      with={CARD_COMMUNITY_REFERRAL(item.referralShopName)}
                    >
                      {item.referralShopName}
                    </Modal>
                    ?
                  </span>
                </Details>
                <LinkButton
                  branded
                  to={item.referral}
                  onClick={() => {
                    ga("event", {
                      category: "out",
                      action: "shop",
                      label: item.referral,
                    });
                  }}
                >
                  Buy {item.type}
                </LinkButton>
                <div style={{ height: "1em", width: "100%" }} />
              </React.Fragment>
            ))}
          </ArticleSection>
        </ArticleWrapper>
      </Main>
    </>
  );
};

Shop.getInitialProps = async ({ req }) => {
  // return cache instead of fetching, if available
  const cache = responseCache.get(request);
  if (process.browser && cache) return { shopInventory: cache };

  return puppy(request)
    .then(r => r.json())
    .then(response => {
      if (response.items) {
        // set cache when comping from another part of the app
        responseCache.set(request, response);
        return { shopInventory: response, isSsr: !!req };
      }
      return { isSsr: !!req };
    })
    .catch(() => {
      return { isSsr: !!req };
    });
};

export default withRedux(Shop);
