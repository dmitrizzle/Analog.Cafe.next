import { NextSeo } from "next-seo";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import styled from "styled-components";

import { API } from "../constants/router/defaults";
import { HeartInline } from "../core/components/icons/Heart";
import { c_red } from "../constants/styles/themes";
import { makeFroth } from "../utils/froth";
import { responseCache } from "../utils/storage/ls-cache";
import { withRedux } from "../utils/with-redux";
import ArticleSection from "../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../core/components/pages/Article/components/ArticleWrapper";
import Figure from "../core/components/vignettes/Picture/components/Figure";
import HeaderLarge from "../core/components/vignettes/HeaderLarge";
import Link from "../core/components/controls/Link";
import LinkButton from "../core/components/controls/Button/components/LinkButton";
import Main from "../core/components/layouts/Main";
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
  text-align: center;
  font-size: 0.85em;
  svg {
    width: 1em;
    display: inline-block;
    margin: 0.25em 0.5em 0 -1.5em;
    fill: ${c_red};
  }
`;

const Shop = props => {
  const seo = {
    title: "Shop",
    description: "Shop print products, film, cameras, and more.",
    images: [
      {
        url: makeFroth({ src: "image-froth_1502065_MloqLes--", size: "l" }).src,
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

  // const items = props.shopInventory?.items || [];

  const featureLink =
    "https://www.etsy.com/listing/863470710/monochrome-issue-120-hand-made-perfect";

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
            <h3>
              Monochrome magazine{" "}
              <small style={{ fontSize: ".5em" }}>
                $
                <Link
                  to={featureLink}
                  onClick={() => {
                    ga("event", {
                      category: "out",
                      action: "shop.link",
                      label: "Monochrome.Etsy",
                    });
                  }}
                >
                  19 on Etsy
                </Link>
                .
              </small>
            </h3>
            <p>
              Monochrome is a hand-made community magazine documenting the
              beautiful, private, and uncanny scenes from the fourteen
              photographers’ homes. This printed issue is a memento of the year
              2020, and the events that changed our modern lives forever.
            </p>
            <p>
              <em>Supplies are limited</em> &mdash;{" "}
              <Link
                to={featureLink}
                onClick={() => {
                  ga("event", {
                    category: "out",
                    action: "shop.link",
                    label: "Monochrome.Etsy",
                  });
                }}
              >
                <strong>Buy Now</strong>
              </Link>{" "}
              on Etsy.
            </p>
            <Link
              to={featureLink}
              onClick={() => {
                ga("event", {
                  category: "out",
                  action: "shop.poster",
                  label: "Monochrome.Etsy",
                });
              }}
            >
              <Figure src="image-froth_648989_iRkhuwAGp" feature />
            </Link>
            <LinkButton
              branded
              to={featureLink}
              onClick={() => {
                ga("event", {
                  category: "out",
                  action: "shop.button",
                  label: "Monochrome.Etsy",
                });
              }}
            >
              Buy on Etsy $19
            </LinkButton>
            <p style={{ textAlign: "center", marginTop: "-1em" }}>
              <small>
                <Link
                  to={featureLink}
                  onClick={() => {
                    ga("event", {
                      category: "out",
                      action: "shop.poster",
                      label: "Monochrome.Etsy",
                    });
                  }}
                >
                  More info & images.
                </Link>
              </small>
            </p>
            <p>
              Monochrome features lots of film photography, plus a few short
              stories, spread over 50 pages in black and white. Printed, bound,
              and packaged by-hand on sustainably-sourced 32lb 8½x11” paper
              inside of even thicker cover fibre. The pages are stapled together
              3x for maximum durability and wrapped in hand-sliced black
              textured cardstock around the spine. This mag comes with an
              undeniable hand-made feel, and the quality matching that of pro
              shops.
            </p>
            <p style={{ textAlign: "center" }}>
              <em>All proceeds are donated to charity.</em>
              <br />
              <HeartInline branded />
            </p>

            <h3>
              More at{" "}
              <Link
                to="https://www.etsy.com/shop/filmbase"
                onClick={() => {
                  ga("event", {
                    category: "out",
                    action: "shop.link",
                    label: "Storefront.Etsy",
                  });
                }}
              >
                FilmBase
              </Link>{" "}
              <span>&mdash; our Etsy shop.</span>
            </h3>
            <p>
              <em>
                At{" "}
                <strong>
                  <Link
                    to="https://www.etsy.com/shop/filmbase"
                    onClick={() => {
                      ga("event", {
                        category: "out",
                        action: "shop.link",
                        label: "Storefront.Etsy",
                      });
                    }}
                  >
                    FilmBase
                  </Link>
                  ,
                </strong>{" "}
                you’ll find inspected, repaired, and film-tested cameras with
                detailed descriptions and care instructions. This is also the
                place to look for rare-to-find accessories and printed
                creations.
              </em>
            </p>

            {status === "ok" ? (
              <Deals>
                {deals?.items.map((deal, iterable) => (
                  <React.Fragment key={iterable}>
                    <PriceTag />
                    <strong>
                      <Link
                        to={deal.link}
                        onClick={() => {
                          ga("event", {
                            category: "out",
                            action: "shop.link",
                            label: deal.title,
                          });
                        }}
                      >
                        {deal.title}
                      </Link>
                    </strong>{" "}
                    {deal.description}
                    <br />
                  </React.Fragment>
                ))}
              </Deals>
            ) : (
              <Deals>
                Analog.Cafe members get deals.{" "}
                <strong>
                  <Link to="/sign-in">Sign in</Link>
                </strong>{" "}
                to get yours.
              </Deals>
            )}
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

// const Details = styled.p`
//   font-size: 0.8em;
//   font-style: italic;
//   text-align: center;
//   > span {
//     color: ${({ theme }) => theme.grey_dark};
//     display: inline-block;
//   }
// `;
// const ItemHeader = styled.h3`
//   padding-top: ${props => {
//     return props.iterable > 0 ? "3em !important" : "2em !important";
//   }};
//   svg {
//     width: 0.45em;
//     display: block;
//     margin: 0.33em 0 0 -0.65em;
//     float: left;
//     fill: ${c_red};
//   }
// `;
// const PosterWrapper = styled.div`
//   ${bleed};
//   height: 18em;
//   overflow-x: scroll;
//   overflow-y: hidden;
//   -webkit-overflow-scrolling: touch;
//   ::-webkit-scrollbar {
//     display: none;
//   }
//   margin-top: 3em;
//   text-align: center;
//
//   .lazyload-wrapper {
//     height: 100%;
//   }
// `;

/*
<h3>Analog.Cafe Recommends.</h3>
{items.map((item, iterable) => (
  <React.Fragment key={iterable}>
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
    <p>
      <strong>
        <em>{item.title}.</em>
      </strong>
    </p>
    <p>{item.description}</p>
    <Details>
      {item.details?.map(detail => (
        <React.Fragment key={detail.to}>
          <Link
            style={{ display: "inline-block" }}
            onClick={() => {
              ga("event", {
                category: "out",
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
*/
