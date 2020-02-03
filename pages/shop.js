import { NextSeo } from "next-seo";
import React, { useState } from "react";

import { API } from "../constants/router/defaults";
import { c_grey_dark } from "../constants/styles/colors";
import { makeFroth } from "../utils/froth";
import { responseCache } from "../utils/storage/ls-cache";
import ArticleSection from "../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../core/components/pages/Article/components/ArticleWrapper";
import CardButton from "../core/components/controls/Card/components/CardButton";
import CardCaption from "../core/components/controls/Card/components/CardCaption";
import CardFigure from "../core/components/controls/Card/components/CardFigure";
import CardHeader from "../core/components/controls/Card/components/CardHeader";
import CardMason, {
  CardIntegratedForMason,
} from "../core/components/controls/Card/components/CardMason";
import Figure from "../core/components/vignettes/Picture/components/Figure";
import HeaderLarge from "../core/components/vignettes/HeaderLarge";
import Link from "../core/components/controls/Link";
import Main from "../core/components/layouts/Main";
import Modal from "../core/components/controls/Modal";
import ga from "../utils/data/ga";
import puppy from "../utils/puppy";

const request = {
  url: API.ADS,
  method: "get",
  params: {
    location: "shop",
  },
};

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

  useState(() => {
    // set cache on first render
    const cache = responseCache.get(request);
    if (!cache) responseCache.set(request, props.shopInventory);
  });
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
      <Main>
        <ArticleWrapper>
          <HeaderLarge
            pageTitle={seo.title}
            pageSubtitle={"Hand-picked selections for Analog.Cafe readers"}
          />
          <ArticleSection>
            <p
              style={{
                textAlign: "center",
                color: c_grey_dark,
                marginTop: ".5em",
              }}
            >
              <small>
                <em>
                  Shop{" "}
                  <Modal
                    with={{
                      info: {
                        title: "Community Partner Products",
                        text:
                          "We chose to work with select small trusted businesses that create quality products and services for our creative community. If you choose to purchase from them, a small percentage of a sale will come back to Analog.Cafe – at no extra cost to you. Your support is appreciated!",
                      },
                      id: "help/affiliate",
                    }}
                  >
                    directly
                  </Modal>{" "}
                  from our friendly, trusted community retailers. Prices in USD.
                </em>
              </small>
            </p>
            <CardMason style={{}}>
              {items.map(product => (
                <CardIntegratedForMason key={product.referral}>
                  <CardHeader
                    buttons={[0]}
                    stubborn
                    noStar
                    title={product.title}
                  />
                  <Link
                    to={product.referral}
                    onClick={() => {
                      ga("event", {
                        category: "Shop",
                        action: "Poster.click",
                        label: product.referral,
                      });
                    }}
                  >
                    <CardFigure image={product.poster} />
                  </Link>
                  <CardCaption>
                    <p>{product.description}</p>
                    <p>
                      <strong>
                        You will be buying directly from{" "}
                        {product.referralShopName}.
                      </strong>
                    </p>
                  </CardCaption>
                  {product.buttons.map(button => {
                    const isReferral = button.to === "REFERRAL";
                    return (
                      <CardButton
                        key={button.to}
                        to={isReferral ? product.referral : button.to}
                        branded={isReferral || button.branded}
                        onClick={() => {
                          ga("event", {
                            category: "Shop",
                            action: "Button.click",
                            label: isReferral ? product.referral : button.to,
                          });
                        }}
                      >
                        {isReferral ? (
                          <>
                            Buy {product.type}{" "}
                            <small style={{ fontSize: ".5em" }}>
                              {product.priceAppend}
                            </small>{" "}
                            ${product.price.usd}
                          </>
                        ) : (
                          button.text
                        )}
                      </CardButton>
                    );
                  })}
                </CardIntegratedForMason>
              ))}
            </CardMason>

            <h3 style={{ textAlign: "center" }}>
              More at{" "}
              <Link to="https://analoguewonderland.co.uk/?p=rJutywT1L">
                Analogue Wonderland
              </Link>
              .
            </h3>
            <Figure
              src="image-froth_1610000_r1WbC_bgQ"
              feature
              // caption="Dubble Film"
            ></Figure>
          </ArticleSection>
        </ArticleWrapper>
      </Main>
    </>
  );
};

Shop.getInitialProps = async () => {
  // return cache instead of fetching, if available
  const cache = responseCache.get(request);
  if (process.browser && cache) return { shopInventory: cache };

  return puppy(request)
    .then(r => r.json())
    .then(response => {
      if (response.items) {
        // set cache when comping from another part of the app
        responseCache.set(request, response);
        return { shopInventory: response };
      }
      return {};
    })
    .catch(() => {
      return {};
    });
};

export default Shop;
