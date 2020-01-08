import { NextSeo } from "next-seo";
import React from "react";

import { SHOP_INVENTORY } from "../core/components/pages/Shop/constants";
import { makeFroth } from "../utils/froth";
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

const Shop = () => {
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
            <p style={{ textAlign: "center" }}>
              Shop{" "}
              <Modal
                with={{
                  info: {
                    title: "Preferred Product Links",
                    text:
                      "Analog.Cafe made a few direct relationships with small businesses that create quality products and services for people like you. If you choose to purchase, a small percentage of a sale will come back to Analog.Cafe – at no extra cost to you. Your support is appreciated!",
                  },
                  id: "help/affiliate",
                }}
              >
                directly
              </Modal>{" "}
              from our friendly, trusted community retailers. Prices in USD.
            </p>
            <CardMason style={{ paddingTop: "1.5em" }}>
              {SHOP_INVENTORY.map(product => (
                <CardIntegratedForMason key={product.referral}>
                  <CardHeader
                    buttons={[0]}
                    stubborn
                    noStar
                    title={product.title}
                  />
                  <Link to={product.referral}>
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

            <h3>More film:</h3>
            <p>
              Make sure to visit{" "}
              <strong>
                <Link to="https://analoguewonderland.co.uk/?p=rJutywT1L">
                  Analogue Wonderland
                </Link>
              </strong>
              , Analog.Cafe’s trusted shop in UK, for 200+ more film and
              photography products. You can learn more about them{" "}
              <Link to="/r/analogue-wonderland-4mim">here</Link>.
            </p>

            <Figure
              src="image-froth_1610000_r1WbC_bgQ"
              feature
              caption="Dubble Film"
            >
              Photo by <Link to="/u/paul-sw81">Paul McKay</Link>, founder of
              Analouge Wonderland.
            </Figure>
          </ArticleSection>
        </ArticleWrapper>
      </Main>
    </>
  );
};

export default Shop;
