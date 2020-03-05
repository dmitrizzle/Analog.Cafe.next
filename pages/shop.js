import { NextSeo } from "next-seo";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import styled from "styled-components";

import { API } from "../constants/router/defaults";
import { c_yellow } from "../constants/styles/colors";
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
import Modal from "../core/components/controls/Modal";
import Present from "../core/components/icons/Present";
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
  min-height: 2.5em;
  line-height: 1.25em;
  font-size: 0.8em;
  strong {
    background: ${c_yellow};
  }
`;
const Details = styled.p`
  font-size: 0.8em;
  text-align: center;
  line-height: 1.5em;
  padding-bottom: 2.5em;
`;
const ItemHeader = styled.h3`
  padding-top: ${props => (props.iterable ? "3em" : "inherit")};
  svg {
    width: 0.5em;
    display: block;
    margin: 0.33em 0 0 -0.75em;
    float: left;
  }
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
    // set cache on first render
    const cache = responseCache.get(request);
    if (!cache) responseCache.set(request, props.shopInventory);

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

            {items.map((item, iterable) => (
              <React.Fragment key={iterable}>
                <ItemHeader>
                  <Present /> {item.title}.
                </ItemHeader>
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
                  ))}
                </Details>
                <p
                  style={{
                    textAlign: "center",
                    marginBottom: "-2em",
                    fontSize: ".52em",
                  }}
                >
                  Why buy from{" "}
                  <Modal
                    with={{
                      info: {
                        title: "Community Referral",
                        text: (
                          <>
                            <strong>
                              Analog.Cafe chose to endorse{" "}
                              {item.referralShopName} products because we are
                              their customer.
                            </strong>{" "}
                            We’ve tried and trust their service. If you choose
                            to purchase from {item.referralShopName}, a small
                            percentage of a sale will come back to Analog.Cafe —
                            at no extra cost to you. Your support is
                            appreciated!
                          </>
                        ),
                      },
                      id: "help/affiliate",
                    }}
                  >
                    {item.referralShopName}
                  </Modal>
                  ?
                </p>
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

                {item.poster && (
                  <Figure
                    style={{ cursor: "default" }}
                    feature
                    src={item.poster}
                    alt={item.title}
                  />
                )}
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
